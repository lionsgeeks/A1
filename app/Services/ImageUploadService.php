<?php

namespace App\Services;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageUploadService
{
    protected $imageManager;

    public function __construct()
    {
        $this->imageManager = new ImageManager(new Driver());
    }

    /**
     * Compress image with specific parameters
     */
    public function compressImage(UploadedFile $file, string $directory = 'projects', ?string $filename = null, int $quality = 90, int $maxWidth = 2000, int $maxHeight = 2000): string
    {
        // Generate filename if not provided
        if (!$filename) {
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        }
        
        $path = $directory . '/' . $filename;

        // Read and process the image
        $image = $this->imageManager->read($file->getPathname());

        // Resize if larger than max dimensions while maintaining aspect ratio
        if ($image->width() > $maxWidth || $image->height() > $maxHeight) {
            $image->scaleDown(width: $maxWidth, height: $maxHeight);
        }

        // Compress and encode
        $encoded = $image->toJpeg($quality);

        // Store the processed image
        Storage::disk('public')->put($path, $encoded);

        return '/storage/' . $path;
    }

    /**
     * Upload and compress an image
     */
    public function uploadImage(UploadedFile $file, string $directory = 'projects', int $quality = 90, int $maxWidth = 2000): string
    {
        return $this->compressImage($file, $directory, null, $quality, $maxWidth, $maxWidth);
    }

    /**
     * Upload multiple images
     */
    public function uploadMultipleImages(array $files, string $directory = 'projects', int $quality = 90, int $maxWidth = 2000): array
    {
        $paths = [];
        
        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $paths[] = $this->compressImage($file, $directory, null, $quality, $maxWidth, $maxWidth);
            }
        }

        return $paths;
    }

    /**
     * Delete an image
     */
    public function deleteImage(string $path): bool
    {
        // Remove /storage/ prefix to get the actual storage path
        $storagePath = str_replace('/storage/', '', $path);
        
        return Storage::disk('public')->delete($storagePath);
    }

    /**
     * Upload image and generate both full-size and thumbnail versions
     * Returns array with 'full' and 'thumb' paths
     */
    public function uploadWithThumbnail(UploadedFile $file, string $directory = 'projects', int $fullQuality = 90, int $fullMaxSize = 2000, int $thumbQuality = 75, int $thumbSize = 200): array
    {
        $originalExtension = $file->getClientOriginalExtension();
        $baseFilename = Str::uuid();
        
        // Generate full-size compressed image
        $fullFilename = $baseFilename . '.' . $originalExtension;
        $fullPath = $directory . '/' . $fullFilename;
        
        $image = $this->imageManager->read($file->getPathname());
        if ($image->width() > $fullMaxSize || $image->height() > $fullMaxSize) {
            $image->scaleDown(width: $fullMaxSize, height: $fullMaxSize);
        }
        Storage::disk('public')->put($fullPath, $image->toJpeg($fullQuality));
        $fullUrl = '/storage/' . $fullPath;
        
        // Generate thumbnail
        $thumbDirectory = $directory . '/thumbs';
        $thumbFilename = $baseFilename . '_thumb.' . $originalExtension;
        $thumbPath = $thumbDirectory . '/' . $thumbFilename;
        
        // Ensure thumbnail directory exists
        if (!Storage::disk('public')->exists($thumbDirectory)) {
            Storage::disk('public')->makeDirectory($thumbDirectory);
        }
        
        $thumbnail = $this->imageManager->read($file->getPathname());
        $thumbnail->cover($thumbSize, $thumbSize); // Crop to square
        Storage::disk('public')->put($thumbPath, $thumbnail->toJpeg($thumbQuality));
        $thumbUrl = '/storage/' . $thumbPath;
        
        return [
            'full' => $fullUrl,
            'thumb' => $thumbUrl
        ];
    }

    /**
     * Upload multiple images with thumbnails
     */
    public function uploadMultipleWithThumbnails(array $files, string $directory = 'projects'): array
    {
        $results = [];
        
        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $results[] = $this->uploadWithThumbnail($file, $directory);
            }
        }

        return $results;
    }
    /**
     * Delete multiple images (handles both old format and new thumbnail format)
     */
    public function deleteMultipleImages(array $paths): bool
    {
        $success = true;
        
        foreach ($paths as $path) {
            if (is_array($path) && isset($path['full']) && isset($path['thumb'])) {
                // New format with thumbnails
                $this->deleteImage($path['full']);
                $this->deleteImage($path['thumb']);
            } else {
                // Old format (single path)
                if (!$this->deleteImage($path)) {
                    $success = false;
                }
            }
        }

        return $success;
    }
}
