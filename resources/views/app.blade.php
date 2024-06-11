<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />



    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i" rel="stylesheet">


    <link rel="stylesheet" href="{{asset('/css/bootstrap.min.css')}}" />
    <link rel="stylesheet" href="{{asset('/css/animate.css')}}" />
    <link rel="stylesheet" href="{{asset('/css/owl.carousel.min.css')}}" />
    <link rel="stylesheet" href="{{asset('/css/themify-icons.css')}}" />
    <link rel="stylesheet" href="{{asset('/css/flaticon.css')}}" />
    <link rel="stylesheet" href="{{asset('/css/magnific-popup.css')}}" />
    <link rel="stylesheet" href="{{asset('/css/slick.css')}}" />
    <link rel="stylesheet" href="{{asset('/css/bootstrap.min.css')}}" />
    <link rel="stylesheet" href="{{asset('/css/style.css')}}" />



    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia


    <script src="{{asset('/js/custom.js')}}"></script>
    <script src="{{asset('/js/waypoints.min.js')}}"></script>
    <script src="{{asset('/js/jquery.counterup.min.js')}}"></script>
    <script src="{{asset('/js/slick.min.js')}}"></script>
    <script src="{{asset('/js/jquery.nice-select.min.js')}}"></script>
    <script src="{{asset('/js/owl.carousel.min.js')}}"></script>
    <script src="{{asset('/js/masonry.pkgd.js')}}"></script>
    <script src="{{asset('/js/swiper.min.js')}}"></script>
    <script src="{{asset('/js/jquery.magnific-popup.js')}}"></script>
    <script src="{{asset('/js/bootstrap.min.js')}}"></script>
    <script src="{{asset('/js/jquery-1.12.1.min.js')}}"></script>

</body>

</html>