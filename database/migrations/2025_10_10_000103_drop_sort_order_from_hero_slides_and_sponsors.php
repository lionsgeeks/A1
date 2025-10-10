<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('hero_slides', function (Blueprint $table) {
            if (Schema::hasColumn('hero_slides', 'sort_order')) {
                $table->dropColumn('sort_order');
            }
        });

        Schema::table('sponsors', function (Blueprint $table) {
            if (Schema::hasColumn('sponsors', 'sort_order')) {
                $table->dropColumn('sort_order');
            }
        });
    }

    public function down(): void
    {
        Schema::table('hero_slides', function (Blueprint $table) {
            $table->unsignedInteger('sort_order')->default(0);
        });

        Schema::table('sponsors', function (Blueprint $table) {
            $table->unsignedInteger('sort_order')->default(0);
        });
    }
};


