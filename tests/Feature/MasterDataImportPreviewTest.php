<?php

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\UploadedFile;

function superadminUserForMasterData(): User
{
    return User::factory()->create([
        'role' => 'superadmin',
    ]);
}

function companiesImportFile(): UploadedFile
{
    $header = implode(',', [
        'name',
        'legal_name',
        'industry',
        'tax_id',
        'email',
        'phone',
        'website',
        'address_line1',
        'address_line2',
        'city',
        'province',
        'postal_code',
        'country',
        'timezone',
        'is_active',
    ]);

    $validRow = implode(',', [
        'PT Valid Teknologi',
        'PT Valid Teknologi',
        'Technology',
        '',
        'hr@valid.test',
        '',
        '',
        '',
        '',
        'Jakarta',
        '',
        '',
        'ID',
        'Asia/Jakarta',
        '1',
    ]);

    $invalidRow = implode(',', [
        '',
        '',
        'Manufacturing',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '1',
    ]);

    $content = implode("\n", [
        $header,
        $validRow,
        $invalidRow,
    ]);

    return UploadedFile::fake()->createWithContent('companies.csv', $content);
}

test('master data import preview shows row validation report without persisting data', function () {
    $user = superadminUserForMasterData();

    $response = $this->actingAs($user)
        ->post('/modules/organization/companies/import', [
            'file' => companiesImportFile(),
            'duplicate_mode' => 'update',
            'preview_only' => '1',
        ])
        ->assertSessionHas('import_preview')
        ->assertRedirect();

    $this->assertDatabaseCount('companies', 0);

    $preview = $response->getSession()->get('import_preview');
    expect($preview)->not->toBeNull();
    expect($preview['preview_only'])->toBeTrue();
    expect($preview['valid_rows'])->toBe(1);
    expect($preview['invalid_rows'])->toBe(1);
});

test('master data import is rejected when critical row errors exist', function () {
    $user = superadminUserForMasterData();

    $this->actingAs($user)
        ->post('/modules/organization/companies/import', [
            'file' => companiesImportFile(),
            'duplicate_mode' => 'update',
        ])
        ->assertSessionHasErrors('file')
        ->assertRedirect();

    $this->assertDatabaseCount('companies', 0);
});
