<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // For SQLite: ensure category_ids contains valid JSON arrays
        DB::statement("UPDATE projects SET category_ids = '[]' WHERE category_ids IS NULL OR json_valid(category_ids) = 0");
    }

    public function down(): void
    {
        // No-op
    }
};


