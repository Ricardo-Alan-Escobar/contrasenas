<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;


class Password extends Model
{
    protected $fillable = [
        'user_id',
        'site_name',
        'site_url',
        'username',
        'password',
        'category',
        'notes',
    ];

    
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Crypt::encryptString($value);
    }

    
    public function getPasswordAttribute($value)
    {
        return Crypt::decryptString($value);
    }
}
