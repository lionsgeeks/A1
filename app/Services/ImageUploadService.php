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
     * Upload and compress an image
     */
    public function uploadImage(UploadedFile $file, string $directory = 'projects', int $quality = 85, int $maxWidth = 1920): string
    {
        // Generate unique filename
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = $directory . '/' . $filename;

        // Read and process the image
        $image = $this->imageManager->read($file->getPathname());

        // Resize if larger than max width while maintaining aspect ratio
        if ($image->width() > $maxWidth) {
            $image->scale(width: $maxWidth);
        }

        // Compress and encode
        $encoded = $image->toJpeg($quality);

        // Store the processed image
        Storage::disk('public')->put($path, $encoded);

        return '/storage/' . $path;
    }

    /**
     * Upload multiple images
     */
    public function uploadMultipleImages(array $files, string $directory = 'projects', int $quality = 85, int $maxWidth = 1920): array
    {
        $paths = [];
        
        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $paths[] = $this->uploadImage($file, $directory, $quality, $maxWidth);
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
     * Delete multiple images
     */
    public function deleteMultipleImages(array $paths): bool
    {
        $success = true;
        
        foreach ($paths as $path) {
            if (!$this->deleteImage($path)) {
                $success = false;
            }
        }

        return $success;
    }
}
