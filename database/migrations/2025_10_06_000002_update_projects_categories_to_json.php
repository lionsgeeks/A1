<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Add JSON category_ids to support multi-category without new tables
            $table->json('category_ids')->nullable()->after('title');
        });

        // Optionally migrate existing category_id into category_ids
        if (Schema::hasColumn('projects', 'category_id')) {
            \DB::statement("UPDATE projects SET category_ids = JSON_ARRAY(category_id) WHERE category_id IS NOT NULL");
        }

        Schema::table('projects', function (Blueprint $table) {
            // Drop legacy foreign key and column if present
            if (Schema::hasColumn('projects', 'category_id')) {
                $table->dropForeign(['category_id']);
                $table->dropColumn('category_id');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Restore category_id (nullable) for rollback
            $table->unsignedBigInteger('category_id')->nullable()->after('title');
        });

        // Backfill first id from category_ids if available
        \DB::statement("UPDATE projects SET category_id = JSON_EXTRACT(category_ids, '$[0]') WHERE category_ids IS NOT NULL");

        Schema::table('projects', function (Blueprint $table) {
            if (Schema::hasColumn('projects', 'category_ids')) {
                $table->dropColumn('category_ids');
            }
        });
    }
};


