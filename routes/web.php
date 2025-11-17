<?php

use Illuminate\Support\Facades\Route;

// Home Page
Route::get('/', function () {
    return view('index');
})->name('home');


//donations
Route::prefix('donations')->group(function () {
    Route::get('/' , function () {
        return view('donations.index');
    })->name('donations.index');
    Route::get('/{id}', function () {
        return view('donations.show');
    })->name('donations.show');
});

//regions
Route::prefix('regions')->group(function () {
    Route::get('/', function () {
        return view('regions.index');
    })->name('regions.index');
    Route::get('/{id}', function () {
        return view('regions.show');
    })->name('regions.show');
    Route::get('/teams', function () {
        return view('regions.teams');
    })->name('regions.teams');
    Route::get('/players', function () {
        return view('regions.players');
    })->name('regions.players');
    Route::get('/academies', function () {
        return view('regions.academies');
    })->name('regions.academies');
});
//league
Route::prefix('leagues')->group(function () {
    Route::get('/', function () {
        return view('leagues.index');
    })->name('leagues.index');
    Route::get('/{id}', function () {
        return view('leagues.show');
    })->name('leagues.show');
});

//teams
Route::prefix('teams')->group(function () {
    Route::get('/', function () {
        return view('teams.index');
    })->name('teams.index');
    Route::get('/{id}', function () {
        return view('teams.show');
    })->name('teams.show');
    Route::get('/ranking', function () {
        return view('teams.ranking');
    })->name('teams.ranking');
});

// clubs
Route::prefix('clubs')->group(function () {
    Route::get('/', function () {
        return view('clubs.index');
    })->name('clubs.index');
    Route::get('/{id}', function () {
        return view('clubs.show');
    })->name('clubs.show');
});

// Academies
Route::prefix('academies')->group(function () {
    Route::get('/', function () {
        return view('academies.index');
    })->name('academies.index');
    Route::get('/{id}', function () {
        return view('academies.show');
    })->name('academies.show');
});

// Players
Route::prefix('players')->group(function () {
    Route::get('/', function () {
        return view('players.index');
    })->name('players.index');
    Route::get('/{id}', function () {
        return view('players.show');
    })->name('players.show');
    Route::get('/ranking', function () {
        return view('players.ranking');
    })->name('players.ranking');
    Route::get('/scouts', function () {
        return view('players.scouts');
    })->name('players.scouts');
});

// Coaches
Route::prefix('coaches')->group(function () {
    Route::get('/', function () {
        return view('coaches.index');
    })->name('coaches.index');
    Route::get('/{id}', function () {
        return view('coaches.show');
    })->name('coaches.show');
    Route::get('/ranking', function () {
        return view('coaches.ranking');
    })->name('coaches.ranking');
    Route::get('/courses', function () {
        return view('coaches.courses');
    })->name('coaches.courses');
});

// Referees
Route::prefix('referees')->group(function () {
    Route::get('/', function () {
        return view('referees.index');
    })->name('referees.index');
    Route::get('/{id}', function () {
        return view('referees.show');
    })->name('referees.show');
    Route::get('/ranking', function () {
        return view('referees.ranking');
    })->name('referees.ranking');
    Route::get('/training', function () {
        return view('referees.training');
    })->name('referees.training');
});

// Sponsors
Route::prefix('sponsors')->group(function () {
    Route::get('/', function () {
        return view('sponsors.index');
    })->name('sponsors.index');
    Route::get('/{id}', function () {
        return view('sponsors.show');
    })->name('sponsors.show');
    Route::get('/become', function () {
        return view('sponsors.become');
    })->name('sponsors.become');
    Route::get('/packages', function () {
        return view('sponsors.packages');
    })->name('sponsors.packages');
});

// Videos
Route::prefix('videos')->group(function () {
    Route::get('/', function () {
        return view('videos.index');
    })->name('videos.index');
    Route::get('/{id}', function () {
        return view('videos.show');
    })->name('videos.show');
    Route::get('/upload', function () {
        return view('videos.create');
    })->name('videos.create');
    Route::post('/', function () {
        return view('videos.store');
    })->name('videos.store');
});

// Matches
Route::prefix('matches')->group(function () {
    Route::get('/', function () {
        return view('matches.index');
    })->name('matches.index');
    Route::get('/{id}', function () {
        return view('matches.show');
    })->name('matches.show');
});

// Authentication
Route::middleware(['guest'])->group(function () {
    Route::get('/login', function () {
        return view('auth.login'); // يعرض صفحة تسجيل الدخول فقط
    })->name('login');
    Route::get('/signup', function () {
        return view('auth.signup'); // يعرض صفحة تسجيل الدخول فقط
    })->name('signup');
});

// Authenticated User Routes
Route::middleware(['auth'])->group(function () {
    Route::post('/logout', function () {
        return view('auth.logout'); // يعرض صفحة تسجيل الدخول فقط
    })->name('logout');
    
    // User Profile
    Route::prefix('profile')->group(function () {
        Route::get('/', function () {
            return view('profile.edit'); // يعرض صفحة تسجيل الدخول فقط
        })->name('profile.edit');
        Route::put('/', function () {
            return view('profile.update'); // يعرض صفحة تسجيل الدخول فقط
        })->name('profile.update');
        Route::put('/password', function () {
            return view('profile.updatePassword'); // يعرض صفحة تسجيل الدخول فقط
        })->name('profile.password');
    });
    
});

// News
Route::prefix('news')->name('news.')->group(function () {
    Route::get('/', function () {
        return view('news.index'); // يعرض صفحة تسجيل الدخول فقط
    })->name('index');
    Route::get('/{id}', function () {
        return view('news.show'); // يعرض صفحة تسجيل الدخول فقط
    })->name('show');
});

// Static Pages
Route::get('/about', function () {
    return view('about.index');
})->name('about');

Route::get('/about/developers', function () {
    return view('about.developers');
})->name('about.developers');

Route::get('/contact', function () {
    return view('pages.contact');
})->name('contact');

Route::get('/terms', function () {
    return view('pages.terms');
})->name('terms');

Route::get('/privacy', function () {
    return view('pages.privacy');
})->name('privacy');
