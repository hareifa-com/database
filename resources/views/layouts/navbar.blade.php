<header class="sticky-top">
    <nav class="navbar navbar-expand-lg navbar-dark bg-black py-3">
        <div class="container-fluid">
            <!-- Logo and Toggle -->
            <a class="navbar-brand me-4" href="/">
                <img src="{{ asset('images/logo.png') }}" alt="حريفة" style="height: 40px; filter: brightness(0) invert(1)">
            </a>
            
            <!-- Desktop Navigation -->
            <div class="d-none d-md-flex align-items-center">
                <!-- القائمة الرئيسية -->
                <div class="dropdown me-4">
                    <a class="text-decoration-none text-white-50 hover-text-white dropdown-toggle px-2 py-1" href="#" role="button" id="mainMenu" data-bs-toggle="dropdown" aria-expanded="false">
                        القائمة الرئيسية
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm" aria-labelledby="mainMenu">
                        <li><a class="dropdown-item py-2" href="{{ route('home') }}">الرئيسية</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('news.index') }}">الأخبار</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('about') }}">من نحن</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('donations.index') }}">التبرعات</a></li>
                    </ul>
                </div>

                <!-- المناطق -->
                <div class="dropdown me-4">
                    <a class="text-decoration-none text-white-50 hover-text-white dropdown-toggle px-2 py-1" href="#" role="button" id="regionsMenu" data-bs-toggle="dropdown" aria-expanded="false">
                        المناطق
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm" aria-labelledby="regionsMenu">
                        <li><a class="dropdown-item py-2" href="{{ route('regions.index') }}"><i class="fas fa-map-marker-alt ms-2"></i>جميع المناطق</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('regions.teams') }}"><i class="fas fa-users ms-2"></i>الفرق حسب المنطقة</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('regions.players') }}"><i class="fas fa-user-friends ms-2"></i>اللاعبون حسب المنطقة</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('regions.academies') }}"><i class="fas fa-school ms-2"></i>الأكاديميات حسب المنطقة</a></li>
                    </ul>
                </div>

                <!-- المنافسات -->
                <div class="dropdown me-4">
                    <a class="text-decoration-none text-white-50 hover-text-white dropdown-toggle px-2 py-1" href="#" id="competitionsMenu" data-bs-toggle="dropdown" aria-expanded="false">
                        المنافسات
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm" aria-labelledby="competitionsMenu">
                        <li><h6 class="dropdown-header">المسابقات</h6></li>
                        <li><a class="dropdown-item py-2" href="{{ route('leagues.index') }}"><i class="fas fa-trophy ms-2"></i>جميع المسابقات</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><h6 class="dropdown-header">الفرق</h6></li>
                        <li><a class="dropdown-item py-2" href="{{ route('teams.index') }}"><i class="fas fa-users ms-2"></i>جميع الفرق</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('teams.ranking') }}"><i class="fas fa-sort-amount-down ms-2"></i>تصنيف الفرق</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('matches.index') }}"><i class="fas fa-futbol ms-2"></i>مباريات الفرق</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><h6 class="dropdown-header">الأكاديميات</h6></li>
                        <li><a class="dropdown-item py-2" href="{{ route('academies.index') }}"><i class="fas fa-school ms-2"></i>جميع الأكاديميات</a></li>
                    </ul>
                </div>

                <!-- اللاعبون -->
                <div class="dropdown me-4">
                    <a class="text-decoration-none text-white-50 hover-text-white dropdown-toggle px-2 py-1" href="#" id="playersMenu" data-bs-toggle="dropdown" aria-expanded="false">
                        اللاعبون
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm" aria-labelledby="playersMenu">
                        <li><a class="dropdown-item py-2" href="{{ route('players.index') }}"><i class="fas fa-users ms-2"></i>جميع اللاعبين</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('players.ranking') }}"><i class="fas fa-trophy ms-2"></i>تصنيف اللاعبين</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('players.scouts') }}"><i class="fas fa-binoculars ms-2"></i>اكتشاف المواهب</a></li>
                    </ul>
                </div>

                <!-- الكوادر -->
                <div class="dropdown me-4">
                    <a class="text-decoration-none text-white-50 hover-text-white dropdown-toggle px-2 py-1" href="#" id="staffMenu" data-bs-toggle="dropdown" aria-expanded="false">
                        الكوادر
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm" aria-labelledby="staffMenu">
                        <li><h6 class="dropdown-header">المدربون</h6></li>
                        <li><a class="dropdown-item py-2" href="{{ route('coaches.index') }}"><i class="fas fa-user-tie ms-2"></i>جميع المدربين</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('coaches.ranking') }}"><i class="fas fa-trophy ms-2"></i>أفضل المدربين</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('coaches.courses') }}"><i class="fas fa-graduation-cap ms-2"></i>الدورات التدريبية</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><h6 class="dropdown-header">الحكام</h6></li>
                        <li><a class="dropdown-item py-2" href="{{ route('referees.index') }}"><i class="fas fa-whistle ms-2"></i>جميع الحكام</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('referees.ranking') }}"><i class="fas fa-star ms-2"></i>تصنيف الحكام</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('referees.training') }}"><i class="fas fa-certificate ms-2"></i>دورات الحكام</a></li>
                    </ul>
                </div>

                <!-- الرعاية -->
                <div class="dropdown">
                    <a class="text-decoration-none text-white-50 hover-text-white dropdown-toggle px-2 py-1" href="#" id="sponsorsMenu" data-bs-toggle="dropdown" aria-expanded="false">
                        الرعاية
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm" aria-labelledby="sponsorsMenu">
                        <li><a class="dropdown-item py-2" href="{{ route('sponsors.index') }}">الرعاة الرسميون</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('sponsors.become') }}">كن راعياً</a></li>
                        <li><a class="dropdown-item py-2" href="{{ route('sponsors.packages') }}">باقات الرعاية</a></li>
                    </ul>
                </div>
            </div>
            
            <!-- Auth Buttons and Mobile Toggle -->
            <div class="d-none d-md-flex align-items-center">
                    <a href="{{ route('login') }}" class="btn btn-sm btn-outline-light border-2 fw-bold px-3 py-1 rounded-pill hover-text-dark transition-all me-2">
                        تسجيل الدخول
                    </a>
                    <a href="{{ route('signup') }}" class="btn btn-sm btn-light text-dark fw-bold px-3 py-1 rounded-pill hover-bg-white transition-all shadow-sm">
                        إنشاء حساب
                    </a>
                </div>
                <button class="navbar-toggler ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
            
            <!-- Mobile Menu (Collapsible) -->
            <div class="collapse navbar-collapse mt-2" id="navbarNav">
                <div class="d-flex flex-column d-md-none">
                    <!-- القائمة الرئيسية -->
                    <a href="{{ route('home') }}" class="text-decoration-none text-white-50 py-2 px-3 hover-text-white border-bottom border-dark">
                        الرئيسية
                    </a>
                    <a href="{{ route('news.index') }}" class="text-decoration-none text-white-50 py-2 px-3 hover-text-white border-bottom border-dark">
                        الأخبار
                    </a>
                    <a href="{{ route('about') }}" class="text-decoration-none text-white-50 py-2 px-3 hover-text-white border-bottom border-dark">
                        من نحن
                    </a>
                    <a href="{{ route('donations.index') }}" class="text-decoration-none text-white-50 py-2 px-3 hover-text-white border-bottom border-dark">
                        التبرعات
                    </a>

                    <!-- المناطق -->
                    <div class="border-bottom border-dark">
                        <a class="text-decoration-none text-white-50 py-2 px-3 d-block hover-text-white" data-bs-toggle="collapse" href="#mobileRegionsMenu" role="button">
                            <i class="fas fa-map-marker-alt ms-2"></i>المناطق
                        </a>
                        <div class="collapse ps-3" id="mobileRegionsMenu">
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('regions.index') }}"><i class="fas fa-map-marked-alt ms-2"></i>جميع المناطق</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('regions.teams') }}"><i class="fas fa-users ms-2"></i>الفرق حسب المنطقة</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('regions.players') }}"><i class="fas fa-user-friends ms-2"></i>اللاعبون حسب المنطقة</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white mb-2" href="{{ route('regions.academies') }}"><i class="fas fa-school ms-2"></i>الأكاديميات حسب المنطقة</a>
                        </div>
                    </div>

                    <!-- المنافسات -->
                    <div class="border-bottom border-dark">
                        <a class="text-decoration-none text-white-50 py-2 px-3 d-block hover-text-white" data-bs-toggle="collapse" href="#mobileCompetitionsMenu" role="button">
                            <i class="fas fa-trophy ms-2"></i>المنافسات
                        </a>
                        <div class="collapse ps-3" id="mobileCompetitionsMenu">
                            <div class="text-muted small py-1 px-2">المسابقات</div>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('leagues.index') }}"><i class="fas fa-trophy ms-2"></i>جميع المسابقات</a>
                            
                            <div class="text-muted small py-1 px-2 mt-2">الفرق</div>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('teams.index') }}"><i class="fas fa-users ms-2"></i>جميع الفرق</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('teams.ranking') }}"><i class="fas fa-sort-amount-down ms-2"></i>تصنيف الفرق</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('matches.index') }}"><i class="fas fa-futbol ms-2"></i>مباريات الفرق</a>
                            
                            <div class="text-muted small py-1 px-2 mt-2">الأكاديميات</div>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white mb-2" href="{{ route('academies.index') }}"><i class="fas fa-school ms-2"></i>جميع الأكاديميات</a>
                        </div>
                    </div>

                    <!-- اللاعبون -->
                    <div class="border-bottom border-dark">
                        <a class="text-decoration-none text-white-50 py-2 px-3 d-block hover-text-white" data-bs-toggle="collapse" href="#mobilePlayersMenu" role="button">
                            <i class="fas fa-users ms-2"></i>اللاعبون
                        </a>
                        <div class="collapse ps-3" id="mobilePlayersMenu">
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('players.index') }}"><i class="fas fa-users ms-2"></i>جميع اللاعبين</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('players.ranking') }}"><i class="fas fa-trophy ms-2"></i>تصنيف اللاعبين</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white mb-2" href="{{ route('players.scouts') }}"><i class="fas fa-binoculars ms-2"></i>اكتشاف المواهب</a>
                        </div>
                    </div>

                    <!-- الكوادر -->
                    <div class="border-bottom border-dark">
                        <a class="text-decoration-none text-white-50 py-2 px-3 d-block hover-text-white" data-bs-toggle="collapse" href="#mobileStaffMenu" role="button">
                            <i class="fas fa-user-tie ms-2"></i>الكوادر
                        </a>
                        <div class="collapse ps-3" id="mobileStaffMenu">
                            <div class="text-muted small py-1 px-2">المدربون</div>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('coaches.index') }}"><i class="fas fa-user-tie ms-2"></i>جميع المدربين</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('coaches.ranking') }}"><i class="fas fa-trophy ms-2"></i>أفضل المدربين</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('coaches.courses') }}"><i class="fas fa-graduation-cap ms-2"></i>الدورات التدريبية</a>
                            
                            <div class="text-muted small py-1 px-2 mt-2">الحكام</div>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('referees.index') }}"><i class="fas fa-whistle ms-2"></i>جميع الحكام</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('referees.ranking') }}"><i class="fas fa-star ms-2"></i>تصنيف الحكام</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white mb-2" href="{{ route('referees.training') }}"><i class="fas fa-certificate ms-2"></i>دورات الحكام</a>
                        </div>
                    </div>

                    <!-- الرعاية -->
                    <div class="border-bottom border-dark">
                        <a class="text-decoration-none text-white-50 py-2 px-3 d-block hover-text-white" data-bs-toggle="collapse" href="#mobileSponsorsMenu" role="button">
                            الرعاية
                        </a>
                        <div class="collapse ps-3" id="mobileSponsorsMenu">
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('sponsors.index') }}">الرعاة الرسميون</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white" href="{{ route('sponsors.become') }}">كن راعياً</a>
                            <a class="d-block py-2 text-white-50 text-decoration-none hover-text-white mb-2" href="{{ route('sponsors.packages') }}">باقات الرعاية</a>
                        </div>
                    </div>
                    <div class="d-grid gap-2 mt-2">
                        <a href="{{ route('login') }}" class="btn btn-outline-light rounded-pill d-flex align-items-center justify-content-center">
                            <i class="fas fa-sign-in-alt ms-2"></i>تسجيل الدخول
                        </a>
                        <a href="{{ route('signup') }}" class="btn btn-light text-dark rounded-pill d-flex align-items-center justify-content-center">
                            <i class="fas fa-user-plus ms-2"></i>إنشاء حساب
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</header>