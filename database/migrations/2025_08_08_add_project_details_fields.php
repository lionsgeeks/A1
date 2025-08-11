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
            $table->string('start_year', 4)->nullable()->after('year');
            $table->string('end_year', 4)->nullable()->after('start_year');
            $table->string('achievement_status')->nullable()->after('status'); // ACHEVÉ, EN COURS, etc.
            $table->string('surface_area')->nullable()->after('location'); // 7000 m²
            $table->string('client_name')->nullable()->after('surface_area'); // CASA AMÉNAGEMENT / CID
            $table->string('project_cost')->nullable()->after('client_name'); // 21 Mdhs
            $table->integer('duration_months')->nullable()->after('project_cost'); // Duration in months
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'start_year',
                'end_year', 
                'achievement_status',
                'surface_area',
                'client_name',
                'project_cost',
                'duration_months'
            ]);
        });
    }
};
