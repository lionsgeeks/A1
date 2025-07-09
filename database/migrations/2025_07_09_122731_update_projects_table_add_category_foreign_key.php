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
            // Add category_id column
            $table->unsignedBigInteger('category_id')->nullable()->after('title');

            // Add foreign key constraint
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('set null');

            // Keep the old category column for now (we'll migrate data then remove it)
            // $table->string('category')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Drop foreign key and column
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
        });
    }
};
