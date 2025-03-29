<?php
declare(strict_types=1);

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Task extends Model
{
    use HasFactory, Notifiable;
    /**
     * Summary of fillable
     * @var array
     */
    protected $fillable = [
        'megnevezes',
        'prioritas',
        'utemezett_nap',
        'hossz',
        'kesz',
        'megbizottak'
    ];

    /**
     * Summary of casts
     * @var array
     */
    protected $casts = [
        'kesz' => 'boolean',
        'megbizottak' => 'array',
        'utemezett_nap' => 'date',
    ];

    public static function validateWeekdayOrAbort($date): void {
        $nap = Carbon::parse($date);
        if ($nap->isWeekend()) {
            abort(response()->json(['error' => 'Feladatot csak hétköznapra lehet ütemezni.'], 422));
        }
    }

    public static function validateMaxHoursOrAbort(string $date, array $megbizottak, int $pluszHossz): void
    {
        foreach ($megbizottak as $user) {
            $osszido = self::whereJsonContains('megbizottak', $user)
                ->whereDate('utemezett_nap', $date)
                ->sum('hossz');

            if ($osszido + $pluszHossz > 480) {
                abort(response()->json([
                    'error' => "A(z) {$user} részére az adott napon már túl sok feladat van ütemezve."
                ], 422));
            }
        }
    }
}
