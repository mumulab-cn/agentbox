<?php
require_once './config/config_reader.php';
$appName = getAppName();
$appSubtitle = getAppSubtitle();
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $appName; ?></title>
    <link href="./src/css/tailwind.min.css" rel="stylesheet">
    <link href="./src/css/sandbox.css" rel="stylesheet">
    <link href="./src/css/attributeSummary.css" rel="stylesheet">
    <link href="./src/css/index-page.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <!--<link href="../src/css/font-awesome.css" rel="stylesheet">-->
</head>
<body>
    <?php 
        $svg_1 = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" class="size-8 flex-none"><path fill="#fff" d="M0 0h32v32H0z"></path><rect width="23" height="22" x="3" y="5" stroke="#0EA5E9" stroke-linejoin="round" stroke-width="1.5" rx="2"></rect><rect width="10" height="18" x="19" y="9" fill="#E0F2FE" stroke="#0EA5E9" stroke-linejoin="round" stroke-width="1.5" rx="2"></rect><circle cx="6" cy="8" r="1" fill="#0EA5E9"></circle><circle cx="9" cy="8" r="1" fill="#0EA5E9"></circle><path stroke="#0EA5E9" stroke-width="1.5" d="M3 11h16"></path></svg>';
        $svg_2 = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" class="size-8 flex-none"><path fill="#fff" d="M0 0h32v32H0z"></path><path fill="#E0F2FE" d="M23 22l7-4v7l-7 4v-7zM9 22l7-4v7l-7 4v-7zM16 11l7-4v7l-7 4v-7zM2 18l7 4v7l-7-4v-7zM9 7l7 4v7l-7-4V7zM16 18l7 4v7l-7-4v-7z"></path><path fill="#0EA5E9" d="M16 3l.372-.651a.75.75 0 00-.744 0L16 3zm7 4h.75a.75.75 0 00-.378-.651L23 7zM9 7l-.372-.651A.75.75 0 008.25 7H9zM2 18l-.372-.651A.75.75 0 001.25 18H2zm28 0h.75a.75.75 0 00-.378-.651L30 18zm0 7l.372.651A.75.75 0 0030.75 25H30zm-7 4l-.372.651a.75.75 0 00.744 0L23 29zM9 29l-.372.651a.75.75 0 00.744 0L9 29zm-7-4h-.75c0 .27.144.518.378.651L2 25zM15.628 3.651l7 4 .744-1.302-7-4-.744 1.302zm7 2.698l-7 4 .744 1.302 7-4-.744-1.302zm-6.256 4l-7-4-.744 1.302 7 4 .744-1.302zm-7-2.698l7-4-.744-1.302-7 4 .744 1.302zm-.744 7l7 4 .744-1.302-7-4-.744 1.302zm7 2.698l-7 4 .744 1.302 7-4-.744-1.302zm-6.256 4l-7-4-.744 1.302 7 4 .744-1.302zm-7-2.698l7-4-.744-1.302-7 4 .744 1.302zm20.256-4l7 4 .744-1.302-7-4-.744 1.302zm7 2.698l-7 4 .744 1.302 7-4-.744-1.302zm-6.256 4l-7-4-.744 1.302 7 4 .744-1.302zm-7-2.698l7-4-.744-1.302-7 4 .744 1.302zm13.256 5.698l-7 4 .744 1.302 7-4-.744-1.302zm-6.256 4l-7-4-.744 1.302 7 4 .744-1.302zM30.75 25v-7h-1.5v7h1.5zm-15.122-.651l-7 4 .744 1.302 7-4-.744-1.302zm-6.256 4l-7-4-.744 1.302 7 4 .744-1.302zM2.75 25v-7h-1.5v7h1.5zm14 0v-7h-1.5v7h1.5zM8.25 7v7h1.5V7h-1.5zm14 0v7h1.5V7h-1.5zm-7 4v7h1.5v-7h-1.5zm-7 11v7h1.5v-7h-1.5zm14 0v7h1.5v-7h-1.5z"></path></svg>';
        $svg_3 = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32" class="size-8 flex-none"><path fill="#fff" d="M0 0h32v32H0z"></path><path fill="#E0F2FE" d="M13.168 18.828a4 4 0 110-5.656L15.997 16l1.5-1.5 1.328-1.328a4 4 0 110 5.656L15.996 16l-1.499 1.5-1.329 1.328z"></path><path stroke="#0EA5E9" stroke-linecap="round" stroke-width="1.5" d="M14.497 17.5l-1.329 1.328a4 4 0 110-5.656l5.657 5.656a4 4 0 100-5.656L17.496 14.5"></path><circle cx="16" cy="16" r="14" stroke="#0EA5E9" stroke-width="1.5"></circle></svg>';
        
        $svg_str_user = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 32 32"><g stroke-width="2" transform="translate(0, 0)"><polyline points="1 14 16 2 31 14" fill="none" stroke="#333333" stroke-miterlimit="10" stroke-width="2" data-cap="butt" stroke-linecap="butt" stroke-linejoin="miter"></polyline><circle cx="16" cy="17" r="3" fill="none" stroke="#333333" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" data-color="color-2" stroke-linejoin="miter"></circle><path d="M23,30A7,7,0,0,0,9,30" fill="none" stroke="#333333" stroke-miterlimit="10" stroke-width="2" data-cap="butt" data-color="color-2" stroke-linecap="butt" stroke-linejoin="miter"></path><polyline points="5 16 5 30 27 30 27 16" fill="none" stroke="#333333" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></polyline></g></svg>';

        $svg_loading = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="22px" height="22px" viewBox="0 0 48 48"><g stroke-width="2" transform="translate(0, 0)"><g class="nc-loop-dots-4-48-icon-o" stroke-width="2"><circle cx="9" cy="24" fill="none" r="5" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></circle><circle cx="24" cy="24" fill="none" r="5" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" data-color="color-2" stroke-linejoin="miter"></circle><circle cx="39" cy="24" fill="none" r="5" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></circle></g><style data-cap="butt" stroke-width="2" stroke-linecap="butt" stroke-linejoin="miter">.nc-loop-dots-4-48-icon-o{--animation-duration:0.8s}.nc-loop-dots-4-48-icon-o *{opacity:.4;transform:scale(.75);animation:nc-loop-dots-4-anim var(--animation-duration) infinite}.nc-loop-dots-4-48-icon-o :nth-child(1){transform-origin:9px 24px;animation-delay:-.3s;animation-delay:calc(var(--animation-duration)/-2.666)}.nc-loop-dots-4-48-icon-o :nth-child(2){transform-origin:24px 24px;animation-delay:-.15s;animation-delay:calc(var(--animation-duration)/-5.333)}.nc-loop-dots-4-48-icon-o :nth-child(3){transform-origin:39px 24px}@keyframes nc-loop-dots-4-anim{0%,100%{opacity:.4;transform:scale(.75)}50%{opacity:1;transform:scale(1)}}</style></g></svg>';
        $svg_done = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 48 48"><g transform="translate(0, 0)"><path d="M24 1C11.3 1 1 11.3 1 24C1 36.7 11.3 47 24 47C36.7 47 47 36.7 47 24C47 11.3 36.7 1 24 1Z" fill="url(#nc-ui-6-0_linear_215_87)"></path> <path d="M36.7 16.7L20.7 32.7C20.5 32.9 20.3 33 20 33C19.7 33 19.5 32.9 19.3 32.7L11.3 24.7C10.9 24.3 10.9 23.7 11.3 23.3C11.7 22.9 12.3 22.9 12.7 23.3L20 30.6L35.3 15.3C35.7 14.9 36.3 14.9 36.7 15.3C37.1 15.7 37.1 16.3 36.7 16.7Z" fill="url(#nc-ui-6-1_linear_215_87)"></path> <defs> <linearGradient id="nc-ui-6-0_linear_215_87" x1="24" y1="1" x2="24" y2="47" gradientUnits="userSpaceOnUse"> <stop stop-color="#D8F3E0"></stop> <stop offset="1" stop-color="#9EE0B1"></stop> </linearGradient> <linearGradient id="nc-ui-6-1_linear_215_87" x1="24" y1="15" x2="24" y2="33" gradientUnits="userSpaceOnUse"> <stop stop-color="#6AD084"></stop> <stop offset="1" stop-color="#3CB34B"></stop> </linearGradient> </defs></g></svg>';
        $svg_error = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 48 48"><g transform="translate(0, 0)"><path d="M24 1C11.297 1 1 11.297 1 24C1 36.703 11.297 47 24 47C36.703 47 47 36.703 47 24C47 11.297 36.703 1 24 1Z" fill="url(#nc-ui-7-0_linear_219_102)"></path><path d="M25 10H23C22.4477 10 22 10.4477 22 11V29C22 29.5523 22.4477 30 23 30H25C25.5523 30 26 29.5523 26 29V11C26 10.4477 25.5523 10 25 10Z" fill="url(#nc-ui-7-1_linear_219_102)"></path><path d="M24 39C25.3807 39 26.5 37.8807 26.5 36.5C26.5 35.1193 25.3807 34 24 34C22.6193 34 21.5 35.1193 21.5 36.5C21.5 37.8807 22.6193 39 24 39Z" fill="url(#nc-ui-7-2_linear_219_102)"></path><defs><linearGradient id="nc-ui-7-0_linear_219_102" x1="24" y1="1" x2="24" y2="47" gradientUnits="userSpaceOnUse"><stop stop-color="#FFD6DA"></stop><stop offset="1" stop-color="#FF9EA8"></stop></linearGradient><linearGradient id="nc-ui-7-1_linear_219_102" x1="24" y1="10" x2="24" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#FF666D"></stop><stop offset="1" stop-color="#E0211F"></stop></linearGradient><linearGradient id="nc-ui-7-2_linear_219_102" x1="24" y1="34" x2="24" y2="39" gradientUnits="userSpaceOnUse"><stop stop-color="#FF666D"></stop><stop offset="1" stop-color="#E0211F"></stop></linearGradient></defs></g></svg>';
        $svg_setting = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 64 64"><g stroke-width="2" transform="translate(0, 0)"><path d="M62,36V28l-8.595-1.074a21.817,21.817,0,0,0-2.681-6.474l5.317-6.836L50.384,7.959l-6.836,5.317A21.885,21.885,0,0,0,37.074,10.6L36,2H28l-1.074,8.6a21.817,21.817,0,0,0-6.474,2.681L13.616,7.959,7.959,13.616l5.317,6.836A21.885,21.885,0,0,0,10.6,26.926L2,28v8l8.6,1.074a21.817,21.817,0,0,0,2.681,6.474L7.959,50.384l5.657,5.657,6.836-5.317a21.9,21.9,0,0,0,6.474,2.681L28,62h8l1.074-8.595a21.817,21.817,0,0,0,6.474-2.681l6.836,5.317,5.657-5.657-5.317-6.836a21.9,21.9,0,0,0,2.681-6.474Z" fill="none" stroke="#333333" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="round"></path><line x1="32" y1="36" x2="32" y2="42" fill="none" stroke="#3849e5" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" data-color="color-2" stroke-linejoin="round"></line><circle cx="32" cy="30" r="6" fill="none" stroke="#3849e5" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" data-color="color-2" stroke-linejoin="round"></circle></g></svg>';
        $svg_remove_16 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px" viewBox="0 0 12 12"><g stroke-width="1" transform="translate(0, 0)"><line x1="1.5" y1="1.5" x2="10.5" y2="10.5" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"></line><line x1="10.5" y1="1.5" x2="1.5" y2="10.5" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"></line></g></svg>';
        $svg_remove = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 16 16"><g transform="translate(0, 0)"><line fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="13.5" y1="2.5" x2="2.5" y2="13.5" data-cap="butt"></line><line fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="2.5" y1="2.5" x2="13.5" y2="13.5" data-cap="butt"></line></g></svg>';
        $svg_help = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 64 64"><g stroke-width="2" transform="translate(0, 0)"><circle cx="32" cy="32" r="29" fill="none" stroke="#444444" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></circle><circle data-color="color-2" cx="32" cy="47" r="1" fill="none" stroke="#444444" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></circle><path data-color="color-2" d="M25,16.551c5.481-2.425,12.575-2.136,15,1.787s.748,8.483-3.4,12S32,36.232,32,39" fill="none" stroke="#444444" stroke-linecap="square" stroke-miterlimit="10" stroke-width="2" stroke-linejoin="miter"></path></g></svg>';
        $svg_text = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 48 48"><g stroke-width="6" transform="translate(0, 0)"><polyline points="6 44 23.5 4 24.5 4 42 44" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="6" stroke-linejoin="miter"></polyline><line x1="12.125" y1="30" x2="35.875" y2="30" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="6" data-cap="butt" stroke-linecap="butt" stroke-linejoin="miter"></line></g></svg>';
        $svg_prompt = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 64 64"><g stroke-width="6" transform="translate(0, 0)"><polyline points="35 29 39.606 24.394 5.333 58.667" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="6" stroke-linejoin="miter"></polyline><polygon points="52.985 17.577 56.062 7.938 46.423 11.015 38 5 38 15 30 21.217 39.606 24.393 42.783 34 49 26 59 26 52.985 17.577" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="6" data-color="color-2" stroke-linejoin="miter"></polygon><path d="M10,30c2.209,0,4-1.791,4-4,0,2.209,1.791,4,4,4-2.209,0-4,1.791-4,4,0-2.209-1.791-4-4-4Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" data-cap="butt" data-color="color-2" stroke-linecap="butt" stroke-linejoin="miter"></path><path d="M27,10c-3.866,0-7,3.134-7,7,0-3.866-3.134-7-7-7,3.866,0,7-3.134,7-7,0,3.866,3.134,7,7,7Z" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" data-cap="butt" stroke-linecap="butt" stroke-linejoin="miter"></path><path d="M34,54c0-2.209,1.791-4,4-4-2.209,0-4-1.791-4-4,0,2.209-1.791,4-4,4,2.209,0,4,1.791,4,4Z" fill="#FFFFFF" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" data-cap="butt" data-color="color-2" stroke-linecap="butt" stroke-linejoin="miter"></path><path d="M54,37c0,3.866-3.134,7-7,7,3.866,0,7,3.134,7,7,0-3.866,3.134-7,7-7-3.866,0-7-3.134-7-7Z" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="2" data-cap="butt" stroke-linecap="butt" stroke-linejoin="miter"></path></g></svg>';
        $svg_regenerate = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 48 48"><g stroke-width="4" transform="translate(0, 0)"><circle data-color="color-2" cx="24" cy="24" r="6" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="4" stroke-linejoin="miter"></circle><polyline points="42.068 2.26 43.526 13.854 32.142 10.682" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="4" stroke-linejoin="miter"></polyline><path data-cap="butt" d="M43.526,13.854A22,22,0,0,0,2,24" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter"></path><polyline points="5.932 45.74 4.474 34.146 15.858 37.318" fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="4" stroke-linejoin="miter"></polyline><path data-cap="butt" d="M4.474,34.146A22,22,0,0,0,46.005,24" fill="none" stroke="#FFFFFF" stroke-miterlimit="10" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter"></path></g></svg>';

        $svg_text_black = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 48 48"><g stroke-width="6" transform="translate(0, 0)"><polyline points="6 44 23.5 4 24.5 4 42 44" fill="none" stroke="#333333" stroke-linecap="square" stroke-miterlimit="10" stroke-width="6" stroke-linejoin="miter"></polyline><line x1="12.125" y1="30" x2="35.875" y2="30" fill="none" stroke="#333333" stroke-miterlimit="10" stroke-width="6" data-cap="butt" stroke-linecap="butt" stroke-linejoin="miter"></line></g></svg>';
        $svg_prompt_black = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 64 64"><g stroke-width="6" transform="translate(0, 0)"><polyline points="35 29 39.606 24.394 5.333 58.667" fill="none" stroke="#333333" stroke-linecap="square" stroke-miterlimit="10" stroke-width="6" stroke-linejoin="miter"></polyline><polygon points="52.985 17.577 56.062 7.938 46.423 11.015 38 5 38 15 30 21.217 39.606 24.393 42.783 34 49 26 59 26 52.985 17.577" fill="none" stroke="#333333" stroke-linecap="square" stroke-miterlimit="10" stroke-width="6" data-color="color-2" stroke-linejoin="miter"></polygon><path d="M10,30c2.209,0,4-1.791,4-4,0,2.209,1.791,4,4,4-2.209,0-4,1.791-4,4,0-2.209-1.791-4-4-4Z" fill="#333333" stroke="#333333" stroke-miterlimit="10" stroke-width="2" data-cap="butt" data-color="color-2" stroke-linecap="butt" stroke-linejoin="miter"></path><path d="M27,10c-3.866,0-7,3.134-7,7,0-3.866-3.134-7-7-7,3.866,0,7-3.134,7-7,0,3.866,3.134,7,7,7Z" fill="none" stroke="#333333" stroke-miterlimit="10" stroke-width="2" data-cap="butt" stroke-linecap="butt" stroke-linejoin="miter"></path><path d="M34,54c0-2.209,1.791-4,4-4-2.209,0-4-1.791-4-4,0,2.209-1.791,4-4,4,2.209,0,4,1.791,4,4Z" fill="#333333" stroke="#333333" stroke-miterlimit="10" stroke-width="2" data-cap="butt" data-color="color-2" stroke-linecap="butt" stroke-linejoin="miter"></path><path d="M54,37c0,3.866-3.134,7-7,7,3.866,0,7,3.134,7,7,0-3.866,3.134-7,7-7-3.866,0-7-3.134-7-7Z" fill="none" stroke="#333333" stroke-miterlimit="10" stroke-width="2" data-cap="butt" stroke-linecap="butt" stroke-linejoin="miter"></path></g></svg>';
        $svg_regenerate_black = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 48 48"><g stroke-width="4" transform="translate(0, 0)"><circle data-color="color-2" cx="24" cy="24" r="6" fill="none" stroke="#333333" stroke-linecap="square" stroke-miterlimit="10" stroke-width="4" stroke-linejoin="miter"></circle><polyline points="42.068 2.26 43.526 13.854 32.142 10.682" fill="none" stroke="#333333" stroke-linecap="square" stroke-miterlimit="10" stroke-width="4" stroke-linejoin="miter"></polyline><path data-cap="butt" d="M43.526,13.854A22,22,0,0,0,2,24" fill="none" stroke="#333333" stroke-miterlimit="10" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter"></path><polyline points="5.932 45.74 4.474 34.146 15.858 37.318" fill="none" stroke="#333333" stroke-linecap="square" stroke-miterlimit="10" stroke-width="4" stroke-linejoin="miter"></polyline><path data-cap="butt" d="M4.474,34.146A22,22,0,0,0,46.005,24" fill="none" stroke="#333333" stroke-miterlimit="10" stroke-width="4" stroke-linecap="butt" stroke-linejoin="miter"></path></g></svg>';
        $svg_remove_black = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 16 16"><g transform="translate(0, 0)"><line fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="13.5" y1="2.5" x2="2.5" y2="13.5" data-cap="butt"></line><line fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="2.5" y1="2.5" x2="13.5" y2="13.5" data-cap="butt"></line></g></svg>';

        $svg_mini = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 64 64"><g transform="translate(0, 0)"><path data-color="color-2" d="M10,51a.861.861,0,0,0,.124-.008l16-2a1,1,0,0,0,.583-1.7l-5.586-5.586,9.293-9.293a2,2,0,0,0-2.828-2.828l-9.293,9.293-5.586-5.586a1,1,0,0,0-1.7.583l-2,16A1,1,0,0,0,10,51Z" fill="#FFFFFF"></path><path d="M56,6H8a6.006,6.006,0,0,0-6,6V52a6.006,6.006,0,0,0,6,6H56a6.006,6.006,0,0,0,6-6V12A6.006,6.006,0,0,0,56,6ZM14.5,11A1.5,1.5,0,1,1,13,12.5,1.5,1.5,0,0,1,14.5,11Zm-6,0A1.5,1.5,0,1,1,7,12.5,1.5,1.5,0,0,1,8.5,11ZM60,52a4,4,0,0,1-4,4H8a4,4,0,0,1-4-4V19H60Z" fill="#FFFFFF"></path></g></svg>';
        $svg_max = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 48 48"><g transform="translate(0, 0)"><path d="M44.836,2.014l-12,2a1,1,0,0,0-.543,1.693l3.586,3.586-4.293,4.293a2,2,0,1,0,2.828,2.828l4.293-4.293,3.586,3.586a1,1,0,0,0,1.693-.542l2-12a1,1,0,0,0-1.15-1.151Z" fill="#FFFFFF"></path><path d="M43.986,32.835a1,1,0,0,0-1.693-.542l-3.586,3.586-4.293-4.293a2,2,0,0,0-2.828,2.828l4.293,4.293-3.586,3.586a1,1,0,0,0,.543,1.693l12,2A.908.908,0,0,0,45,46a1,1,0,0,0,.986-1.165Z" fill="#FFFFFF"></path><path d="M13.586,31.586,9.293,35.879,5.707,32.293a1,1,0,0,0-1.693.542l-2,12A1,1,0,0,0,3,46a.908.908,0,0,0,.164-.014l12-2a1,1,0,0,0,.543-1.693l-3.586-3.586,4.293-4.293a2,2,0,0,0-2.828-2.828Z" fill="#FFFFFF"></path><path d="M4.014,15.165a1,1,0,0,0,1.693.542l3.586-3.586,4.293,4.293a2,2,0,0,0,2.828-2.828L12.121,9.293l3.586-3.586a1,1,0,0,0-.543-1.693l-12-2a1,1,0,0,0-1.15,1.151Z" fill="#FFFFFF"></path><circle data-color="color-2" cx="24" cy="24" r="7" fill="#FFFFFF"></circle></g></svg>';
        $svg_mini_black = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 64 64"><g transform="translate(0, 0)"><path data-color="color-2" d="M10,51a.861.861,0,0,0,.124-.008l16-2a1,1,0,0,0,.583-1.7l-5.586-5.586,9.293-9.293a2,2,0,0,0-2.828-2.828l-9.293,9.293-5.586-5.586a1,1,0,0,0-1.7.583l-2,16A1,1,0,0,0,10,51Z" fill="#333333"></path><path d="M56,6H8a6.006,6.006,0,0,0-6,6V52a6.006,6.006,0,0,0,6,6H56a6.006,6.006,0,0,0,6-6V12A6.006,6.006,0,0,0,56,6ZM14.5,11A1.5,1.5,0,1,1,13,12.5,1.5,1.5,0,0,1,14.5,11Zm-6,0A1.5,1.5,0,1,1,7,12.5,1.5,1.5,0,0,1,8.5,11ZM60,52a4,4,0,0,1-4,4H8a4,4,0,0,1-4-4V19H60Z" fill="#333333"></path></g></svg>';
        $svg_max_black = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 48 48"><g transform="translate(0, 0)"><path d="M44.836,2.014l-12,2a1,1,0,0,0-.543,1.693l3.586,3.586-4.293,4.293a2,2,0,1,0,2.828,2.828l4.293-4.293,3.586,3.586a1,1,0,0,0,1.693-.542l2-12a1,1,0,0,0-1.15-1.151Z" fill="#333333"></path><path d="M43.986,32.835a1,1,0,0,0-1.693-.542l-3.586,3.586-4.293-4.293a2,2,0,0,0-2.828,2.828l4.293,4.293-3.586,3.586a1,1,0,0,0,.543,1.693l12,2A.908.908,0,0,0,45,46a1,1,0,0,0,.986-1.165Z" fill="#333333"></path><path d="M13.586,31.586,9.293,35.879,5.707,32.293a1,1,0,0,0-1.693.542l-2,12A1,1,0,0,0,3,46a.908.908,0,0,0,.164-.014l12-2a1,1,0,0,0,.543-1.693l-3.586-3.586,4.293-4.293a2,2,0,0,0-2.828-2.828Z" fill="#333333"></path><path d="M4.014,15.165a1,1,0,0,0,1.693.542l3.586-3.586,4.293,4.293a2,2,0,0,0,2.828-2.828L12.121,9.293l3.586-3.586a1,1,0,0,0-.543-1.693l-12-2a1,1,0,0,0-1.15,1.151Z" fill="#333333"></path><circle data-color="color-2" cx="24" cy="24" r="7" fill="#333333"></circle></g></svg>';

        $svg_mini = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 16 16"><g transform="translate(0, 0)"><line fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="13.5" y1="2.5" x2="2.5" y2="13.5" data-cap="butt"></line><line fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="2.5" y1="2.5" x2="13.5" y2="13.5" data-cap="butt"></line></g></svg>';
        $svg_mini_black2 = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 16 16"><g transform="translate(0, 0)"><line fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="13.5" y1="2.5" x2="2.5" y2="13.5" data-cap="butt"></line><line fill="none" stroke="#333333" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="2.5" y1="2.5" x2="13.5" y2="13.5" data-cap="butt"></line></g></svg>';

        // 定义分类图标和颜色
        $category_icons = [
            '1' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
            '2' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
            '3' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path><path d="M7 17.73A2 2 0 1 1 7 15a2 2 0 0 1 0 2.73zM17.73 17.73A2 2 0 1 1 17.73 15a2 2 0 0 1 0 2.73z"></path></svg>',
            '4' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
            '5' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
            '6' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
            '7' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>',
            '8' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path d="M20.4 14.5L16 10 4 20"></path></svg>',
            '9' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M8 11h8"></path><path d="M12 15V7"></path></svg>',
            '10' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>',
            '11' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line><line x1="2" y1="20" x2="22" y2="20"></line></svg>',
            '12' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
            '13'=>$svg_help,
            '14'=>$svg_max_black,
            'default' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>'
        ];
        
        $category_colors = [
            '1' => '#3B82F6', // 蓝色
            '2' => '#10B981', // 绿色
            '3' => '#8B5CF6', // 紫色
            '4' => '#F59E0B', // 橙色
            '5' => '#EF4444', // 红色
            '6' => '#06B6D4', // 青色
            '7' => '#0EA5E9', // 天蓝色
            '8' => '#EC4899', // 粉色
            '9' => '#64748B', // 蓝灰色
            '10' => '#6366F1', // 靛蓝色
            '11' => '#14B8A6', // 蓝绿色
            '12' => '#D946EF', // 紫粉色
            'default' => '#6B7280'  // 灰色
        ];

        $img_list = [
            '1' => './src/images/ai-building-blocks/a1.png', // 蓝色
            '2' => './src/images/ai-building-blocks/a2.png', // 绿色
            '3' => './src/images/ai-building-blocks/a3.png', // 紫色
            '4' => './src/images/ai-building-blocks/a4.png', // 橙色
            '5' => './src/images/ai-building-blocks/a5.png', // 红色
            '6' => './src/images/ai-building-blocks/a6.png', // 青色
            '7' => './src/images/ai-building-blocks/a7.png', // 天蓝色
            '8' => './src/images/ai-building-blocks/a8.png', // 粉色
            'default' => '<i class="fas fa-cube"></i>'  // 灰色
        ];
    ?>
    
    
    <div class="container">
        <div class="main-content">
            <div class="sidebar" id="sidebar" style="overflow-y:scroll !important;">
                <div style="padding:10px 20px 10px 20px;font-size:18px;font-weight:bold;border-bottom:1px solid #CCCCCC;">
                    <?php echo $appName; ?><br /><?php echo $appSubtitle; ?>
                    <div style="margin-top:8px;">
                        <a href="config.php" style="font-size:12px;color:#666;text-decoration:none;display:inline-flex;align-items:center;" title="飞书API配置">
                            <i class="fas fa-cog" style="margin-right:4px;"></i>
                            配置管理
                        </a>
                    </div>
                </div>
                <?php 
                    $data = file_get_contents("./data/feishu_data.json");
                    $list = json_decode($data,true);

                    $index_id = 0;
                    //$new_data = array("应用方式"=>array(),"Prompt"=>array(),"工具"=>array(),"数据"=>array(),"大模型"=>array(),"基础设施"=>array(),"需求"=>array(),"目标"=>array(),"场景"=>array(),"团队"=>array());
                    $new_data = array(
                        "A-资源"=>array(
                            "A1-平台"=>array(),
                            "A2-模型"=>array(),
                            "A3-数据"=>array()
                        ),
                        "B-架构"=>array(
                            "B1-合理部署"=>array(),
                        ),
                        "C-ROI"=>array(
                            "C1-目标"=>array(),
                            "C2-场景"=>array(),
                            "C3-需求"=>array(),
                            "C4-团队"=>array(),
                            "C5-KOL"=>array()
                        ),
                    );
                    
                    $index = 0;
                    foreach($list as $key=>$value){
                        //var_dump($value);
                        //var_dump($value);echo "<hr />";
                        //$config = json_decode($value["config"],true);
                        //$new_data[@$config["type"]][] = $config;
                        $new_value = $value;
                        $new_value["name"] = @$value["名称"][0]["text"];
                        //var_dump($new_value);
                        $new_data[@$value["视图"]][@$value["分类"]][] = $new_value;
                        //var_dump($value["名称"][0]["text"]);

                        if(!isset($config_data[@$value["分类"]])){
                            $n = $index++ % 8 +1;
                            
                            $config_data[@$value["分类"]] = array("icon"=>@$category_icons[$n],"color"=>@$category_colors[$n],"image"=>@$img_list[$n]);
                        }
                    }
                ?>

                <?php 
                    foreach($new_data as $category=>$new_data2){
                        echo "<div style='font-size:14px;font-weight:bold;padding:16px;margin-top:0px;'>".$category."</div>";
                    foreach($new_data2 as $key=>$config){//var_dump($config);
                        // 确定分类图标和颜色
                        $icon = isset($category_icons[$key]) ? $category_icons[$key] : $category_icons['default'];
                        $color = isset($category_colors[$key]) ? $category_colors[$key] : $category_colors['default'];
                        $img = isset($img_list[$key]) ? "<img src='".$img_list[$key]."' />" : $img_list['default'];
                        $icon = @$config_data[$key]["icon"];
                        $color = @$config_data[$key]["color"];
                        $img = "<img src='".@$config_data[$key]["image"]."' />";
                ?>
                <?php 
                    /*if($key == "应用方式") 
                        echo "<div style='font-size:14px;font-weight:bold;padding:16px;margin-top:0px;'>数据</div>";
                    if($key == "需求") 
                        echo "<div style='font-size:14px;font-weight:bold;padding:16px;margin-top:0px;'>场景</div>";
                    if($key == "文本") 
                        echo "<div style='font-size:14px;font-weight:bold;padding:16px;margin-top:0px;'>通用</div>";*/
                ?>
                <div class="toolbar-category">
                    <div class="category-header">
                        <!--<span class="" style="font-size:13px;">▼</span>-->
                        <h3 style="font-size:13px;width:100%;color: <?php echo $color; ?>">
                            <?php echo $icon; ?>
                            <?php echo $key; ?>
                        </h3>
                        <i style="color:#DDDDDD;font-size:13px;" class="category-toggle fas fa-chevron-down category-toggle collapsed"></i>
                    </div>
                    <div class="category-content">
                        <?php foreach($config as $v){
                            $good = @$v["Good"][0]["text"];
                            $bad = @$v["Bad"][0]["text"];
                            $cost = @$v["Cost"][0]["text"];
                            $todo = @$v["Todo"][0]["text"];
                            ?>
                            <div class="block" draggable="true" data-block-id="<?php echo $index_id++; ?>" data-good="<?php echo $good;?>" data-bad="<?php echo $bad;?>" data-cost="<?php echo $cost;?>" data-todo="<?php echo $cost;?>"><?php echo $img;?><?php echo @$v['name'] ?></div>
                        <?php } ?>
                        <div class="clear"></div>
                    </div>
                </div>
                <?php }}?>
                <div class="clear"></div>-->
                <div class="toolbar-category">
                    <div class="category-header">
                        <span class="category-toggle" style="font-size:10px;">
                            <i style="color:#DDDDDD;font-size:13px;float:right;" class="category-toggle fas fa-chevron-up category-toggle"></i>
                        </span>
                        <div style="color: #6B7280;font-size: 12px;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="category-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            文本框
                        </div>
                    </div>
                    <div class="category-content">
                        <div class="text-box" draggable="true">拖动添加文本框</div>
                    </div>
                </div>
            </div>
            
            <div class="canvas-container">
                <div class="canvas" id="canvas">
                    <svg class="svg-container" id="svg-container"></svg>
                </div>
                
                <!-- 属性面板 -->
                <div class="properties-panel" id="properties-panel">
                    <div class="close-panel">&times;</div>
                    <h3>预演/Chatbot</h3>
                    <div class="property-group">
                        <label for="property-good">Demo</label>
                        <iframe src="#"></iframe>
                    </div>
                    <div class="property-group">
                        <label for="property-good">优点 (Good)</label>
                        <textarea id="property-good" placeholder="输入优点..."></textarea>
                    </div>
                    <div class="property-group">
                        <label for="property-bad">缺点 (Bad)</label>
                        <textarea id="property-bad" placeholder="输入缺点..."></textarea>
                    </div>
                    <div class="property-group">
                        <label for="property-cost">成本 (Cost)</label>
                        <textarea id="property-cost" placeholder="输入成本..."></textarea>
                    </div>
                    <div class="property-group">
                        <label for="property-todo">待办 (Todo)</label>
                        <textarea id="property-todo" placeholder="输入待办事项..."></textarea>
                    </div>
                    <div class="panel-buttons">
                        <button class="panel-button cancel-button" id="cancel-properties">取消</button>
                        <button class="panel-button save-button" id="save-properties">保存</button>
                    </div>
                </div>
                
                <!-- 右侧信息栏 -->
                <!-- Toast通知 -->
                <div class="toast-notification" id="toast-notification"></div>
            </div>

            <div class="step-guide-container" style="display:none;width:600px;position:fixed;top:10px;left:100px;padding:0px;background:none;border:none;box-shadow:none;">
                <!--<div style="font-size:13px;border:2px solid #FF8800;border-radius:0.5em;padding:10px;margin-right:10px;">企业知识库问答系统</div>-->
                <div class="step-block active">
                    <div class="step-number" style="color:#FF2200;" title="需求分析">100</div>
                    <!--<div class="step-text">需求分析</div>-->
                </div>
                <div class="step-connector active"></div>
                <div class="step-block" style="background:none;border:none;">
                    <div class="step-number" style="color:#FF2200;" title="系统设计">200</div>
                    <!--<div class="step-text">系统设计</div>-->
                </div>
                <div class="step-connector"></div>
                <div class="step-block" style="background:none;border:none;">
                    <div class="step-number" style="font-size:13px;color:#0066FF;" title="系统设计">3</div>
                    <!--<div class="step-text">详细设计</div>-->
                </div>
                <div class="step-connector"></div>
                <div class="step-block" style="background:none;border:none;">
                    <div class="step-number" style="font-size:13px;color:#00FF66;" title="开发实现">4</div>
                    <!--<div class="step-text">开发实现</div>-->
                </div>
                <div class="step-connector"></div>
                <div class="step-block" style="background:none;border:none;">
                    <div class="step-number" style="font-size:13px;color:#FF0066;" title="测试验证">5</div>
                    <!--<div class="step-text">测试验证</div>-->
                </div>
                <div class="step-connector"></div>
                <div class="step-block" style="background:none;border:none;">
                    <div class="step-number" style="font-size:13px;color:#6600FF;" title="部署上线">6</div>
                    <!--<div class="step-text">部署上线</div>-->
                </div>
            </div>
        </div>

        <div style="width:100%;padding:10px 0;background-color:#FFFFFF;">
        <div id="top-info" style="display:flex;text-align:center;font-size:13px;position:fixed;right:0px;top:0px;margin:8px 20px 0 20px;border-radius:0.5em;overflow-x:hidden;">
            <div style="cursor:pointer;margin-left:10px;align-items:center;display:flex;padding:5px 12px;border-radius:0.5em;float:left;border:0px solid #666666;">
                <div id="theme-toggle" class="" style="font-size:14px;" onclick="toggleTheme()"><div style="width:20px;"><?php echo $svg_setting;?></div></div>
            </div>
            <!--<div id="top-info-1" style="color:#0066FF;width:40px;cursor:pointer;margin-left:10px;align-items:center;display:flex;padding:4px 10px;border-radius:0.5em;float:left;font-size:16px;border:0px solid #FF8800;">
                <?php echo $svg_help;?><i class="fas fa-thumbs-up"></i>&nbsp;<span>0</span>
            </div>
            <div id="top-info-2"  style="color:#FF8800;width:40px;cursor:pointer;margin-left:10px;align-items:center;display:flex;padding:4px 10px;border-radius:0.5em;float:left;font-size:16px;border:0px solid #0066FF;">
                <?php echo $svg_help;?>&nbsp;<span>0</span>
            </div>
            <div id="top-info-3"  style="color:#66FF00;width:40px;cursor:pointer;margin-left:10px;align-items:center;display:flex;padding:4px 10px;border-radius:0.5em;float:left;font-size:16px;border:0px solid #FF0066;">
                <?php echo $svg_help;?>&nbsp;<span>0</span>
            </div>
            <div class="header-actions" style="margin-left:10px;">
                <button id="export-json" class="action-button" style="font-size:16px;border:none !important;"><i class="fas fa-download"></i></button>
                <label for="import-json" class="action-button" style="font-size:16px;border:none !important;"><i class="fas fa-upload"></i></label>
                <input type="file" id="import-json" accept=".json" style="display: none;">
            </div>-->
            <!--<div style="cursor:pointer;margin-left:10px;align-items:center;display:flex;padding:5px 12px;border-radius:0.5em;float:left;border:0px solid #6600FF;">
                <div id="save-project" class="">保存</div>
            </div>-->
            <!--<div style="cursor:pointer;margin-left:6px;align-items:center;display:flex;overflow:hidden;border-radius:0.5em;float:left;font-size:14px;border:0px solid #dc3545;">
                <a id="export-pdf" class="btn btn-sm" style="font-size:12px;padding:5px 5px;background:#dc3545;color:white;"><i class="fas fa-file-pdf"></i> PDF</a>
            </div>
            <div style="cursor:pointer;margin-left:10px;align-items:center;display:flex;overflow:hidden;border-radius:0.5em;float:left;font-size:14px;border:0px solid #198754;">
                <a id="export-excel" class="btn btn-sm" style="font-size:12px;padding:5px 5px;background:#198754;color:white;"><i class="fas fa-file-excel"></i> Excel</a>
            </div>-->
        </div>
        </div>
        
        <!-- 变化日志区域 -->
        <div class="change-log-container" id="change-log-container" style="
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: 150px;
            background: #f8f9fa;
            border-top: 2px solid #dee2e6;
            z-index: 100;
            display: flex;
            flex-direction: column;
            min-height: 28px;
            max-height: 80vh;
        ">
            <!-- 拖动手柄 -->
            <div class="log-resize-handle" id="log-resize-handle" style="
                height: 4px;
                background: #6c757d;
                cursor: ns-resize;
                position: relative;
                top: 0;
                left: 0;
                right: 0;
                z-index: 101;
            ">
                <div style="
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 30px;
                    height: 2px;
                    background: #fff;
                    border-radius: 1px;
                "></div>
            </div>
            <div class="log-header" style="
                padding: 8px 15px;
                background: #e9ecef;
                border-bottom: 1px solid #dee2e6;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-weight: bold;
                font-size: 14px;
            ">
                <span>变化日志</span>
                <div>
                    <button id="clear-log" style="
                        color: white;
                        border: none;
                        padding: 4px 8px;
                        border-radius: 3px;
                        font-size: 12px;
                        cursor: pointer;
                        margin-right: 5px;
                    "><?php echo $svg_mini_black2?></button>
                    <button id="toggle-log" style="
                        color: white;
                        border: none;
                        padding: 4px 8px;
                        border-radius: 3px;
                        font-size: 12px;
                        cursor: pointer;
                    "><?php echo $svg_mini_black?></button>
                </div>
            </div>
            <div class="log-content" id="log-content" style="
                flex: 1;
                padding: 10px 15px;
                overflow-y: auto;
                font-size: 13px;
                line-height: 1.4;
            "></div>
        </div>
        
        <!--<div class="instructions">
            <h3>使用说明</h3>
            <ul>
                <li>从左侧拖动方块到画布中</li>
                <li>方块可以在画布中自由拖动位置</li>
                <li>点击方块上的连接点并拖动到另一个方块的连接点可以创建连线</li>
                <li>点击连线可以删除连线</li>
                <li>从左侧拖动文本框到画布中</li>
                <li>点击文本框可以编辑内容</li>
                <li>文本框可以调整大小和位置</li>
            </ul>
        </div>-->
    </div>
    
    <script src="./src/js/jquery.min.js"></script>
    <script src="./src/js/jquery-ui.min.js"></script>
    <script>
        $(document).ready(function() {
            // 初始化分类折叠功能
            $('.category-header').click(function() {
                const $content = $(this).next('.category-content');
                const $toggle = $(this).find('.category-toggle');
                $content.slideToggle();
                $toggle.toggleClass('collapsed');
            });
            
            // 初始化时设置所有分类为折叠状态
            $('.category-toggle').addClass('collapsed');
            $('.category-content').hide();
            let blockCounter = 0;
            let connections = [];
            let startConnector = null;
            const svgContainer = document.getElementById('svg-container');
            
            // 变化日志功能
            let changeLog = [];
            const LOG_STORAGE_KEY = 'sandbox_change_log';
            
            // 初始化日志
            function initializeLog() {
                // 从LocalStorage加载日志
                const savedLog = localStorage.getItem(LOG_STORAGE_KEY);
                if (savedLog) {
                    try {
                        changeLog = JSON.parse(savedLog);
                    } catch (e) {
                        changeLog = [];
                    }
                }
                updateLogDisplay();
            }
            
            // 添加日志条目
            function addLogEntry(type, message, details = {}) {
                const timestamp = new Date().toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                });
                
                const logEntry = {
                    id: Date.now(),
                    timestamp: timestamp,
                    type: type,
                    message: message,
                    details: details
                };
                
                changeLog.unshift(logEntry); // 新日志添加到开头
                
                // 限制日志数量，保留最近100条
                if (changeLog.length > 100) {
                    changeLog = changeLog.slice(0, 100);
                }
                
                // 保存到LocalStorage
                localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(changeLog));
                
                // 更新显示
                updateLogDisplay();
            }
            
            // 更新日志显示
            function updateLogDisplay() {
                const logContent = $('#log-content');
                
                if (changeLog.length === 0) {
                    logContent.html('<div style="color: #6c757d; font-style: italic;">暂无操作记录</div>');
                    return;
                }
                
                let html = '';
                changeLog.forEach(entry => {
                    const typeColor = getLogTypeColor(entry.type);
                    const typeIcon = getLogTypeIcon(entry.type);
                    
                    html += `
                        <div style="
                            margin-bottom: 8px;
                            padding: 6px 10px;
                            background: white;
                            border-left: 3px solid ${typeColor};
                            border-radius: 3px;
                            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                        ">
                            <div style="display: flex; align-items: center; margin-bottom: 2px;">
                                <span style="color: ${typeColor}; margin-right: 6px;">${typeIcon}</span>
                                <span style="font-weight: 500; color: #495057;">${entry.message}</span>
                                <span style="margin-left: auto; font-size: 11px; color: #6c757d;">${entry.timestamp}</span>
                            </div>
                            ${entry.details && Object.keys(entry.details).length > 0 ? 
                                `<div style="font-size: 11px; color: #6c757d; margin-left: 20px;">${formatLogDetails(entry.details)}</div>` : 
                                ''
                            }
                        </div>
                    `;
                });
                
                logContent.html(html);
                
                // 自动滚动到顶部显示最新日志
                logContent.scrollTop(0);
            }
            
            // 获取日志类型颜色
            function getLogTypeColor(type) {
                const colors = {
                    'add_block': '#28a745',
                    'add_connection': '#007bff',
                    'delete_connection': '#dc3545',
                    'move_block': '#ffc107',
                    'auto_add': '#17a2b8',
                    'auto_connect': '#6f42c1'
                };
                return colors[type] || '#6c757d';
            }
            
            // 获取日志类型图标
            function getLogTypeIcon(type) {
                const icons = {
                    'add_block': '📦',
                    'add_connection': '🔗',
                    'delete_connection': '❌',
                    'move_block': '📍',
                    'auto_add': '🤖',
                    'auto_connect': '🔄'
                };
                return icons[type] || '📝';
            }
            
            // 格式化日志详情
            function formatLogDetails(details) {
                let result = [];
                for (const [key, value] of Object.entries(details)) {
                    result.push(`${key}: ${value}`);
                }
                return result.join(' | ');
            }
            
            // 清空日志
            function clearLog() {
                changeLog = [];
                localStorage.removeItem(LOG_STORAGE_KEY);
                updateLogDisplay();
                showToast('日志已清空');
            }
            
            // 切换日志面板显示/隐藏
            function toggleLogPanel() {
                var svg_max_black = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 48 48"><g transform="translate(0, 0)"><path d="M44.836,2.014l-12,2a1,1,0,0,0-.543,1.693l3.586,3.586-4.293,4.293a2,2,0,1,0,2.828,2.828l4.293-4.293,3.586,3.586a1,1,0,0,0,1.693-.542l2-12a1,1,0,0,0-1.15-1.151Z" fill="#333333"></path><path d="M43.986,32.835a1,1,0,0,0-1.693-.542l-3.586,3.586-4.293-4.293a2,2,0,0,0-2.828,2.828l4.293,4.293-3.586,3.586a1,1,0,0,0,.543,1.693l12,2A.908.908,0,0,0,45,46a1,1,0,0,0,.986-1.165Z" fill="#333333"></path><path d="M13.586,31.586,9.293,35.879,5.707,32.293a1,1,0,0,0-1.693.542l-2,12A1,1,0,0,0,3,46a.908.908,0,0,0,.164-.014l12-2a1,1,0,0,0,.543-1.693l-3.586-3.586,4.293-4.293a2,2,0,0,0-2.828-2.828Z" fill="#333333"></path><path d="M4.014,15.165a1,1,0,0,0,1.693.542l3.586-3.586,4.293,4.293a2,2,0,0,0,2.828-2.828L12.121,9.293l3.586-3.586a1,1,0,0,0-.543-1.693l-12-2a1,1,0,0,0-1.15,1.151Z" fill="#333333"></path><circle data-color="color-2" cx="24" cy="24" r="7" fill="#333333"></circle></g></svg>';
                var svg_mini_black = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 64 64"><g transform="translate(0, 0)"><path data-color="color-2" d="M10,51a.861.861,0,0,0,.124-.008l16-2a1,1,0,0,0,.583-1.7l-5.586-5.586,9.293-9.293a2,2,0,0,0-2.828-2.828l-9.293,9.293-5.586-5.586a1,1,0,0,0-1.7.583l-2,16A1,1,0,0,0,10,51Z" fill="#333333"></path><path d="M56,6H8a6.006,6.006,0,0,0-6,6V52a6.006,6.006,0,0,0,6,6H56a6.006,6.006,0,0,0,6-6V12A6.006,6.006,0,0,0,56,6ZM14.5,11A1.5,1.5,0,1,1,13,12.5,1.5,1.5,0,0,1,14.5,11Zm-6,0A1.5,1.5,0,1,1,7,12.5,1.5,1.5,0,0,1,8.5,11ZM60,52a4,4,0,0,1-4,4H8a4,4,0,0,1-4-4V19H60Z" fill="#333333"></path></g></svg>';
                const container = $('#change-log-container');
                const toggleBtn = $('#toggle-log');
                
                if (container.hasClass('minimized')) {
                    // 恢复到保存的高度或默认高度
                    const savedHeight = localStorage.getItem('log_panel_height') || '150';
                    container.removeClass('minimized').css('height', savedHeight + 'px');
                    toggleBtn.html(svg_mini_black);
                } else {
                    container.addClass('minimized').css('height', '40px');
                    toggleBtn.html(svg_max_black);
                }
            }
            
            // 绑定日志控制按钮事件
            $('#clear-log').on('click', clearLog);
            $('#toggle-log').on('click', toggleLogPanel);
            
            // 拖动调整日志面板高度功能
            let isResizing = false;
            let startY = 0;
            let startHeight = 0;
            
            $('#log-resize-handle').on('mousedown', function(e) {
                isResizing = true;
                startY = e.clientY;
                startHeight = $('#change-log-container').height();
                
                // 防止文本选择
                $('body').css('user-select', 'none');
                
                // 添加全局鼠标事件
                $(document).on('mousemove.resize', function(e) {
                    if (!isResizing) return;
                    
                    const deltaY = startY - e.clientY; // 向上拖动为正值
                    const newHeight = Math.max(42, Math.min(window.innerHeight * 0.8, startHeight + deltaY));
                    
                    $('#change-log-container').css('height', newHeight + 'px');
                });
                
                $(document).on('mouseup.resize', function() {
                    if (isResizing) {
                        isResizing = false;
                        $('body').css('user-select', '');
                        $(document).off('mousemove.resize mouseup.resize');
                        
                        // 保存高度到localStorage
                        const currentHeight = $('#change-log-container').height();
                        localStorage.setItem('log_panel_height', currentHeight);
                    }
                });
                
                e.preventDefault();
            });
            
            // 恢复保存的面板高度
            const savedHeight = localStorage.getItem('log_panel_height');
            if (savedHeight) {
                $('#change-log-container').css('height', savedHeight + 'px');
            }
            
            // 初始化日志
            initializeLog();
            
            // 从侧边栏拖动方块到画布
            $('.block').draggable({
                helper: 'clone',
                cursor: 'move',
                containment: 'document',
                connectToSortable: '#canvas',
                start: function(event, ui) {
                    $(ui.helper).css('z-index', '1000');
                },
                stop: function(event, ui) {}
            });
            
            // 从侧边栏拖动文本框到画布
            $('.text-box').draggable({
                helper: 'clone',
                cursor: 'move',
                containment: 'document',
                connectToSortable: '#canvas',
                start: function(event, ui) {
                    $(ui.helper).css('z-index', '1000');
                },
                stop: function(event, ui) {}
            });
            
            // 画布接收拖入的方块和文本框
            $('#canvas').droppable({
                accept: '.block, .text-box',
                drop: function(event, ui) {
                    const offset = $(this).offset();
                    const xPos = ui.offset.left - offset.left;
                    const yPos = ui.offset.top - offset.top;
                    
                    if (ui.draggable.hasClass('block')) {
                        const blockId = ui.draggable.attr('data-block-id');
                        // 创建新的可拖动方块
                        createDraggableBlock(blockId, xPos, yPos);
                    } else if (ui.draggable.hasClass('text-box')) {
                        // 创建新的可拖动文本框
                        createDraggableTextBox(xPos, yPos);
                    }
                }
            });
            
            // 创建可拖动方块
            function createDraggableBlock(blockId, xPos, yPos) {
                //alert(blockId);
                blockCounter++;
                const uniqueId = `block-${blockCounter}`;
                
                // 获取原始方块的图标和文本
                const originalBlock = $(`.block[data-block-id="${blockId}"]`);
                const iconHTML1 = originalBlock.find('i').prop('outerHTML');
                const iconHTML = originalBlock.find('img').prop('outerHTML');
                const text = originalBlock.first().text();
                console.log(originalBlock);
                console.log(originalBlock[0]);
                //alert(text);
                
                // 初始化方块属性，从原始方块获取属性值
                const blockProperties = {
                    good: originalBlock.attr('data-good') || '',
                    bad: originalBlock.attr('data-bad') || '',
                    cost: originalBlock.attr('data-cost') || '',
                    todo: originalBlock.attr('data-todo') || ''
                };
                
                const block = $(`<div class="draggable-block" id="${uniqueId}" data-block-id="${blockId}">
                    ${iconHTML}
                    ${text}
                    <div class="connector top" data-pos="top"></div>
                    <div class="connector right" data-pos="right"></div>
                    <div class="connector bottom" data-pos="bottom"></div>
                    <div class="connector left" data-pos="left"></div>
                </div>`);
                
                // 存储方块属性
                block.data('properties', blockProperties);
                
                block.css({
                    left: xPos + 'px',
                    top: yPos + 'px'
                });
                
                $('#canvas').append(block);
                
                // 使方块可拖动
                block.draggable({
                    containment: 'parent',
                    cursor: 'move',
                    start: function() {
                        $(this).css('z-index', '100');
                    },
                    drag: function() {
                        // 更新连线
                        updateConnections();
                    },
                    stop: function() {
                        $(this).css('z-index', '10');
                    }
                });
                
                // 连接点事件
                block.find('.connector').on('mousedown', function(e) {
                    e.stopPropagation();
                    startConnector = {
                        element: this,
                        blockId: uniqueId,
                        position: $(this).data('pos')
                    };
                });
                
                // 添加日志记录
                const category = originalBlock.closest('.category').find('h3').text() || '未知分类';
                addLogEntry('add_block', `添加模块: ${text}`, {
                    '模块ID': uniqueId,
                    '位置': `(${Math.round(xPos)}, ${Math.round(yPos)})`,
                    '分类': category
                });
                
                // 返回新创建的模块ID
                return uniqueId;
            }
            
            // 创建可拖动文本框
            function createDraggableTextBox(xPos, yPos) {
                blockCounter++;
                const uniqueId = `textbox-${blockCounter}`;
                
                const textBox = $(`<div class="draggable-text-box" id="${uniqueId}" contenteditable="true">添加文本内容</div>`);
                
                textBox.css({
                    left: xPos + 'px',
                    top: yPos + 'px'
                });
                
                $('#canvas').append(textBox);
                
                // 使文本框可拖动
                textBox.draggable({
                    containment: 'parent',
                    cursor: 'move',
                    start: function() {
                        $(this).css('z-index', '100');
                    },
                    stop: function() {
                        $(this).css('z-index', '10');
                    }
                });
                
                // 点击时选中文本框内容
                textBox.on('click', function(e) {
                    if (!$(e.target).is('input, textarea')) {
                        $(this).focus();
                    }
                });
            }
            
            // 画布鼠标事件
            $(document).on('mousemove', function(e) {
                if (startConnector) {
                    // 绘制临时连线
                    const startBlock = $(`#${startConnector.blockId}`);
                    const startConnectorElement = $(startConnector.element);
                    const startPos = getConnectorPosition(startBlock, startConnectorElement);
                    
                    // 清除临时线
                    $('#temp-line').remove();
                    
                    // 创建临时曲线
                    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                    path.setAttribute('id', 'temp-line');
                    
                    const endX = e.pageX - $('.canvas-container').offset().left;
                    const endY = e.pageY - $('.canvas-container').offset().top;
                    
                    // 计算控制点 - 增加控制点距离使曲线更加圆滑
                    let controlPointDistance = 80;
                    let cpx1, cpy1, cpx2, cpy2;
                    
                    // 根据连接点位置调整控制点
                    if (startConnector.position === 'right') {
                        cpx1 = startPos.x + controlPointDistance;
                        cpy1 = startPos.y;
                        cpx2 = endX - controlPointDistance/2;
                        cpy2 = endY;
                    } else if (startConnector.position === 'left') {
                        cpx1 = startPos.x - controlPointDistance;
                        cpy1 = startPos.y;
                        cpx2 = endX + controlPointDistance/2;
                        cpy2 = endY;
                    } else if (startConnector.position === 'top') {
                        cpx1 = startPos.x;
                        cpy1 = startPos.y - controlPointDistance;
                        cpx2 = endX;
                        cpy2 = endY + controlPointDistance/2;
                    } else { // bottom
                        cpx1 = startPos.x;
                        cpy1 = startPos.y + controlPointDistance;
                        cpx2 = endX;
                        cpy2 = endY - controlPointDistance/2;
                    }
                    
                    // 设置三次贝塞尔曲线路径，使临时连线更加圆滑
                    const pathData = `M ${startPos.x} ${startPos.y} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${endX} ${endY}`;
                    path.setAttribute('d', pathData);
                    path.setAttribute('stroke', '#FF8800');
                    path.setAttribute('stroke-width', '2');
                    path.setAttribute('fill', 'none');
                    path.setAttribute('stroke-dasharray', '5,5');
                    svgContainer.appendChild(path);
                }
            });
            
            $(document).on('mouseup', function(e) {
                if (startConnector) {
                    // 检查是否在另一个连接点上释放
                    const targetElement = $(e.target);
                    
                    if (targetElement.hasClass('connector')) {
                        const endBlockId = targetElement.parent().attr('id');
                        const endPosition = targetElement.data('pos');
                        
                        // 确保不是同一个方块
                        if (startConnector.blockId !== endBlockId) {
                            // 创建连接
                            createConnection(startConnector.blockId, startConnector.position, endBlockId, endPosition);
                        }
                    }
                    
                    // 清除临时线
                    $('#temp-line').remove();
                    startConnector = null;
                }
            });
            
            // 获取连接点位置
            function getConnectorPosition(block, connector) {
                const blockOffset = block.offset();
                const canvasOffset = $('.canvas-container').offset();
                const connectorOffset = connector.offset();
                
                return {
                    x: connectorOffset.left - canvasOffset.left + connector.width() / 2,
                    y: connectorOffset.top - canvasOffset.top + connector.height() / 2
                };
            }
            
            // 创建连接
            function createConnection(startBlockId, startPosition, endBlockId, endPosition) {
                const connectionId = `connection-${connections.length}`;
                
                connections.push({
                    id: connectionId,
                    startBlockId: startBlockId,
                    startPosition: startPosition,
                    endBlockId: endBlockId,
                    endPosition: endPosition
                });
                
                // 绘制连线
                drawConnection(connectionId, startBlockId, startPosition, endBlockId, endPosition);
                
                // 添加连线日志记录
                const startBlock = $(`#${startBlockId}`);
                const endBlock = $(`#${endBlockId}`);
                const startText = startBlock.text().trim() || startBlockId;
                const endText = endBlock.text().trim() || endBlockId;
                
                addLogEntry('add_connection', `创建连线: ${startText} → ${endText}`, {
                    '连线ID': connectionId,
                    '起点': `${startText}(${startPosition})`,
                    '终点': `${endText}(${endPosition})`
                });
            }
            
            // 绘制连接
            function drawConnection(connectionId, startBlockId, startPosition, endBlockId, endPosition) {
                const startBlock = $(`#${startBlockId}`);
                const endBlock = $(`#${endBlockId}`);
                const startConnector = startBlock.find(`.connector.${startPosition}`);
                const endConnector = endBlock.find(`.connector.${endPosition}`);
                
                const startPos = getConnectorPosition(startBlock, startConnector);
                const endPos = getConnectorPosition(endBlock, endConnector);
                //alert(startPos,endPos);
                
                // 移除已存在的连线（如果有）
                $(`#${connectionId}`).remove();
                
                // 创建SVG路径（使用贝塞尔曲线）
                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('id', connectionId);
                
                // 计算控制点 - 增加控制点距离使曲线更加圆滑
                const dx = Math.abs(endPos.x - startPos.x);
                const dy = Math.abs(endPos.y - startPos.y);
                let controlPointDistance = Math.min(150, Math.max(80, dx / 2, dy / 2));
                
                let cpx1, cpy1, cpx2, cpy2;
                
                // 根据连接点位置调整控制点 - 修复连线逻辑
                if (startPosition === 'right') {
                    cpx1 = startPos.x + controlPointDistance;
                    cpy1 = startPos.y;
                } else if (startPosition === 'left') {
                    cpx1 = startPos.x - controlPointDistance;
                    cpy1 = startPos.y;
                } else if (startPosition === 'top') {
                    cpx1 = startPos.x;
                    cpy1 = startPos.y - controlPointDistance;
                } else { // bottom
                    cpx1 = startPos.x;
                    cpy1 = startPos.y + controlPointDistance;
                }
                
                // 修复终点控制点计算逻辑
                if (endPosition === 'right') {
                    cpx2 = endPos.x + controlPointDistance;
                    cpy2 = endPos.y;
                } else if (endPosition === 'left') {
                    cpx2 = endPos.x - controlPointDistance; // 向左延伸
                    cpy2 = endPos.y;
                } else if (endPosition === 'top') {
                    cpx2 = endPos.x;
                    cpy2 = endPos.y - controlPointDistance; // 向上延伸
                } else { // bottom
                    cpx2 = endPos.x;
                    cpy2 = endPos.y + controlPointDistance; // 向下延伸
                }
                
                // 设置贝塞尔曲线路径 - 使用三次贝塞尔曲线实现更圆滑的连线
                const pathData = `M ${startPos.x} ${startPos.y} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${endPos.x} ${endPos.y}`;
                path.setAttribute('d', pathData);
                path.setAttribute('stroke', '#FF8800');
                path.setAttribute('stroke-width', '2');
                path.setAttribute('fill', 'none');
                path.setAttribute('class', 'connection-line');
                
                // 添加点击事件用于删除
                $(path).on('click', function() {
                    // 找到并删除连接
                    const index = connections.findIndex(conn => conn.id === connectionId);
                    if (index !== -1) {
                        connections.splice(index, 1);
                    }
                    // 移除SVG线
                    $(this).remove();
                });
                console.log(svgContainer,path);
                svgContainer.appendChild(path);
            }
            
            // 更新所有连接
            function updateConnections() {
                connections.forEach(conn => {
                    drawConnection(conn.id, conn.startBlockId, conn.startPosition, conn.endBlockId, conn.endPosition);
                });
            }
            
            // 当前选中的方块
            let currentSelectedBlock = null;
            
            // 方块点击事件 - 显示属性面板
            $(document).on('click', '.draggable-block', function(e) {
                // 如果点击的是连接点，不显示属性面板
                if ($(e.target).hasClass('connector')) {
                    return;
                }
                
                // 设置当前选中的方块
                currentSelectedBlock = $(this);
                
                // 获取方块属性
                const blockId = currentSelectedBlock.attr('data-block-id');
                const originalBlock = $(`.block[data-block-id="${blockId}"]`);
                //console.log(originalBlock);
                
                // 优先使用已保存的属性，如果没有则使用原始方块的data属性
                const properties = currentSelectedBlock.data('properties') || {
                    good: originalBlock.attr('data-good') || '',
                    bad: originalBlock.attr('data-bad') || '',
                    cost: originalBlock.attr('data-cost') || '',
                    todo: originalBlock.attr('data-todo') || ''
                };
                
                // 填充属性面板
                $('#property-good').val(properties.good);
                $('#property-bad').val(properties.bad);
                $('#property-cost').val(properties.cost);
                $('#property-todo').val(properties.todo);
                
                // 显示属性面板
                $('#properties-panel').show();
            });
            
            // 关闭属性面板
            $('.close-panel, #cancel-properties').on('click', function() {
                $('#properties-panel').hide();
                currentSelectedBlock = null;
            });
            
            // 保存属性
            $('#save-properties').on('click', function() {
                if (!currentSelectedBlock) return;
                
                // 获取输入的属性值
                const properties = {
                    good: $('#property-good').val(),
                    bad: $('#property-bad').val(),
                    cost: $('#property-cost').val(),
                    todo: $('#property-todo').val()
                };
                
                // 保存属性到方块
                currentSelectedBlock.data('properties', properties);
                
                // 隐藏属性面板
                $('#properties-panel').hide();
                
                // 显示自定义toast通知
                showToast('属性已保存');
            });
            
            // 点击画布空白处关闭属性面板
            $('#canvas').on('click', function(e) {
                if ($(e.target).attr('id') === 'canvas') {
                    $('#properties-panel').hide();
                    currentSelectedBlock = null;
                }
            });
            
            // 侧边栏折叠/展开功能
            $('#sidebar-toggle').on('click', function() {
                const $sidebar = $('#sidebar');
                const $toggle = $(this);
                
                $sidebar.toggleClass('collapsed');
                $toggle.toggleClass('collapsed');
                
                if ($sidebar.hasClass('collapsed')) {
                    $toggle.html('<i class="fas fa-chevron-right"></i>');
                } else {
                    $toggle.html('<i class="fas fa-chevron-left"></i>');
                }
            });
            
            // 初始化时折叠侧边栏
            //$('#sidebar').addClass('collapsed');
            //$('#sidebar-toggle').addClass('collapsed').html('<i class="fas fa-chevron-right"></i>');
            
            // 自动拉取模块功能
            let autoFetchInterval = null;
            let isAutoFetchEnabled = false;
            let lastAddedBlockId = null; // 记录最后添加的模块ID
            
            // 开始自动拉取
            function startAutoFetch() {
                if (autoFetchInterval) {
                    clearInterval(autoFetchInterval);
                }
                
                autoFetchInterval = setInterval(() => {
                    // 获取所有可用的模块
                    const availableBlocks = $('.block[data-block-id]');
                    
                    if (availableBlocks.length > 0) {
                        // 随机选择一个模块
                        const randomIndex = Math.floor(Math.random() * availableBlocks.length);
                        const selectedBlock = $(availableBlocks[randomIndex]);
                        const blockId = selectedBlock.attr('data-block-id');
                        
                        // 获取画布上现有的模块数量，用于计算位置
                        const existingBlocks = $('#canvas .draggable-block');
                        const canvasWidth = $('#canvas').width();
                        const canvasHeight = $('#canvas').height();
                        
                        let randomX, randomY;
                        
                        // 如果有上一个模块，在其附近生成位置
                        if (lastAddedBlockId && $(`#${lastAddedBlockId}`).length > 0) {
                            const lastBlock = $(`#${lastAddedBlockId}`);
                            const lastPos = lastBlock.position();
                            
                            // 在上一个模块的右侧或下方生成新位置
                            const offsetX = 200; // 水平间距
                            const offsetY = 150; // 垂直间距
                            
                            // 优先在右侧放置，如果超出边界则放在下方
                            if (lastPos.left + offsetX + 150 < canvasWidth) {
                                randomX = lastPos.left + offsetX;
                                randomY = lastPos.top + Math.floor(Math.random() * 50) - 25; // 稍微随机化Y位置
                            } else {
                                randomX = Math.floor(Math.random() * (canvasWidth - 150)) + 50;
                                randomY = lastPos.top + offsetY;
                            }
                            
                            // 确保不超出画布边界
                            randomX = Math.max(50, Math.min(randomX, canvasWidth - 150));
                            randomY = Math.max(50, Math.min(randomY, canvasHeight - 100));
                        } else {
                            // 如果没有上一个模块，随机生成位置
                            randomX = Math.floor(Math.random() * (canvasWidth - 150)) + 50;
                            randomY = Math.floor(Math.random() * (canvasHeight - 100)) + 50;
                        }
                        
                        // 创建模块到画布
                        const newBlockId = createDraggableBlock(blockId, randomX, randomY);
                        
                        // 修改刚创建模块的日志类型为自动添加
                        if (changeLog.length > 0 && changeLog[0].type === 'add_block') {
                            changeLog[0].type = 'auto_add';
                            changeLog[0].message = changeLog[0].message.replace('添加模块:', '自动添加模块:');
                            localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(changeLog));
                            updateLogDisplay();
                        }
                        
                        // 如果有上一个模块，创建连接线
                        if (lastAddedBlockId && $(`#${lastAddedBlockId}`).length > 0) {
                            setTimeout(() => {
                                // 自动连接：上一个模块的右侧连接点 -> 新模块的左侧连接点
                                createConnection(lastAddedBlockId, 'right', newBlockId, 'left');
                                
                                // 修改刚创建连线的日志类型为自动连接
                                if (changeLog.length > 0 && changeLog[0].type === 'add_connection') {
                                    changeLog[0].type = 'auto_connect';
                                    changeLog[0].message = changeLog[0].message.replace('创建连线:', '自动连线:');
                                    localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(changeLog));
                                    updateLogDisplay();
                                }
                                
                                showToast(`已自动连接模块`);
                            }, 200); // 延迟确保模块已完全创建
                        }
                        
                        // 更新最后添加的模块ID
                        lastAddedBlockId = newBlockId;
                        
                        // 显示提示信息
                        const blockName = selectedBlock.text().trim();
                        showToast(`自动添加模块: ${blockName}`);
                        
                        // 更新属性汇总面板
                        setTimeout(updateSummaryPanel, 100);
                    }
                }, 5000); // 每5秒执行一次
                
                isAutoFetchEnabled = true;
                showToast('自动拉取模块已启动，每5秒添加一个随机模块并自动连线');
            }
            
            // 停止自动拉取
            function stopAutoFetch() {
                if (autoFetchInterval) {
                    clearInterval(autoFetchInterval);
                    autoFetchInterval = null;
                }
                isAutoFetchEnabled = false;
                lastAddedBlockId = null; // 重置最后添加的模块ID
                showToast('自动拉取模块已停止');
            }
            
            // 切换自动拉取状态
            function toggleAutoFetch() {
                if (isAutoFetchEnabled) {
                    stopAutoFetch();
                } else {
                    startAutoFetch();
                }
            }
            
            // 添加控制按钮到页面
            $(document).ready(function() {
                var svg_magic = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="18px" height="18px" viewBox="0 0 64 64"><g stroke-width="6" transform="translate(0, 0)"><polyline points="35 29 39.606 24.394 5.333 58.667" fill="none" stroke="#333333" stroke-linecap="square" stroke-miterlimit="10" stroke-width="6" stroke-linejoin="miter"></polyline><polygon points="52.985 17.577 56.062 7.938 46.423 11.015 38 5 38 15 30 21.217 39.606 24.393 42.783 34 49 26 59 26 52.985 17.577" fill="none" stroke="#333333" stroke-linecap="square" stroke-miterlimit="10" stroke-width="6" data-color="color-2" stroke-linejoin="miter"></polygon><path d="M10,30c2.209,0,4-1.791,4-4,0,2.209,1.791,4,4,4-2.209,0-4,1.791-4,4,0-2.209-1.791-4-4-4Z" fill="#333333" stroke="#333333" stroke-miterlimit="10" stroke-width="2" data-cap="butt" data-color="color-2" stroke-linecap="butt" stroke-linejoin="miter"></path><path d="M27,10c-3.866,0-7,3.134-7,7,0-3.866-3.134-7-7-7,3.866,0,7-3.134,7-7,0,3.866,3.134,7,7,7Z" fill="none" stroke="#333333" stroke-miterlimit="10" stroke-width="2" data-cap="butt" stroke-linecap="butt" stroke-linejoin="miter"></path><path d="M34,54c0-2.209,1.791-4,4-4-2.209,0-4-1.791-4-4,0,2.209-1.791,4-4,4,2.209,0,4,1.791,4,4Z" fill="#333333" stroke="#333333" stroke-miterlimit="10" stroke-width="2" data-cap="butt" data-color="color-2" stroke-linecap="butt" stroke-linejoin="miter"></path><path d="M54,37c0,3.866-3.134,7-7,7,3.866,0,7,3.134,7,7,0-3.866,3.134-7,7-7-3.866,0-7-3.134-7-7Z" fill="none" stroke="#333333" stroke-miterlimit="10" stroke-width="2" data-cap="butt" stroke-linecap="butt" stroke-linejoin="miter"></path></g></svg>';
                // 在侧边栏顶部添加控制按钮
                const controlButton = $(`
                    <div style=" text-align: center;">
                        <button id="auto-fetch-toggle" style="
                            color: white;
                            border: none;
                            padding: 6px 6px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 12px;
                            margin: 0 0 0 16px;
                            border: 1px solid transparent;
                        "><?php echo $svg_prompt_black;?></button>
                    </div>
                `);
                
                // 插入到侧边栏标题后面
                //$('#sidebar').children().first().after(controlButton);
                //$("#theme-toggle").after(controlButton);
                
                // 绑定点击事件
                $('#auto-fetch-toggle').on('click', function() {
                    toggleAutoFetch();
                    
                    // 更新按钮文本和样式
                    if (isAutoFetchEnabled) {
                        $(this).html(svg_magic).css('background', '#none');
                    } else {
                        $(this).html(svg_magic).css('background', 'none');
                    }
                });
                
                // 鼠标悬停效果
                $('#auto-fetch-toggle').hover(
                    function() {
                        if (isAutoFetchEnabled) {
                            $(this).css('background', '#0066FF20');
                            $(this).css('border', '1px solid #0066FF');
                        } else {
                            $(this).css('background', 'none');
                            $(this).css('border', '1px solid transparent');
                        }
                    },
                    function() {
                        if (isAutoFetchEnabled) {
                            $(this).css('background', '#0066FF20');
                            $(this).css('border', '1px solid #0066FF');
                        } else {
                            $(this).css('background', 'none');
                            $(this).css('border', '1px solid transparent');
                        }
                    }
                );
            });
            
            // 页面卸载时清理定时器
            $(window).on('beforeunload', function() {
                if (autoFetchInterval) {
                    clearInterval(autoFetchInterval);
                }
            });
            
            // 显示Toast通知的函数
            function showToast(message) {
                const toast = $('#toast-notification');
                toast.text(message);
                
                // 设置初始位置（中间）
                toast.css({
                    'top': '50%',
                    'transform': 'translate(-50%, -50%)'
                }).addClass('show');
                
                // 延迟100ms后开始向上移动动画
                setTimeout(function() {
                    toast.css({
                        'top': '20px',
                        'transform': 'translateX(-50%)'
                    });
                }, 100);
                
                // 5秒后隐藏
                setTimeout(function() {
                    toast.removeClass('show');
                    
                    // 等待过渡效果完成后重置位置
                    setTimeout(function() {
                        toast.css({
                            'top': '50%',
                            'transform': 'translate(-50%, -50%)'
                        });
                    }, 300);
                }, 5000);
            }
            
            // 更新属性汇总函数
            function updateSummaryPanel() {
                // 清空现有内容
                $('#summary-good, #summary-bad, #summary-cost, #summary-todo').empty();
                
                // 获取所有方块
                const blocks = $('.draggable-block');
                
                // 如果没有方块，显示提示信息
                if (blocks.length === 0) {
                    $('#summary-good, #summary-bad, #summary-cost, #summary-todo').html('<div class="summary-item">暂无数据</div>');
                    return;
                }
                
                // 遍历所有方块，收集属性
                blocks.each(function() {
                    const $block = $(this);
                    const blockId = $block.attr('id');
                    const blockText = $block.text().trim();
                    const properties = $block.data('properties') || { good: '', bad: '', cost: '', todo: '' };
                    
                    // 只添加有内容的属性
                    if (properties.good) {
                        $('#summary-good').append(`
                            <div class="summary-item">
                                <div class="summary-item-title">${blockText}</div>
                                <div class="summary-item-content">${properties.good}</div>
                            </div>
                        `);
                    }
                    
                    if (properties.bad) {
                        $('#summary-bad').append(`
                            <div class="summary-item">
                                <div class="summary-item-title">${blockText}</div>
                                <div class="summary-item-content">${properties.bad}</div>
                            </div>
                        `);
                    }
                    
                    if (properties.cost) {
                        $('#summary-cost').append(`
                            <div class="summary-item">
                                <div class="summary-item-title">${blockText}</div>
                                <div class="summary-item-content">${properties.cost}</div>
                            </div>
                        `);
                    }
                    
                    if (properties.todo) {
                        $('#summary-todo').append(`
                            <div class="summary-item">
                                <div class="summary-item-title">${blockText}</div>
                                <div class="summary-item-content">${properties.todo}</div>
                            </div>
                        `);
                    }
                });
                
                // 如果某个属性类别没有内容，显示提示信息
                $('.summary-content').each(function() {
                    if ($(this).is(':empty')) {
                        $(this).html('<div class="summary-item">暂无数据</div>');
                    }
                });
            }
            
            // 在保存属性后更新汇总面板
            $('#save-properties').on('click', function() {
                // 原有的保存逻辑之后
                setTimeout(updateSummaryPanel, 100); // 延迟一点执行，确保属性已保存
            });
            
            // 初始化时更新汇总面板
            updateSummaryPanel();
            
            // 当添加或删除方块时更新汇总面板
            $(document).on('DOMNodeInserted DOMNodeRemoved', '.draggable-block', function() {
                setTimeout(updateSummaryPanel, 100);
            });
            
            $('#summary-panel').toggleClass('minimized');
            // 缩小/展开属性汇总面板
            $('#minimize-summary').on('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡
                $('#summary-panel').toggleClass('minimized');
                
                // 切换图标
                if ($('#summary-panel').hasClass('minimized')) {
                    $(this).find('i').removeClass('fa-minus').addClass('fa-expand');
                } else {
                    $(this).find('i').removeClass('fa-expand').addClass('fa-minus');
                }
            });
            
            // 点击缩小后的小图标展开面板
            $(document).on('click', '.summary-panel.minimized', function() {
                $(this).removeClass('minimized');
                $('#minimize-summary').find('i').removeClass('fa-expand').addClass('fa-minus');
            });
            
            // 导入属性统计管理器
            import('./src/js/attributeSummaryManager.js')
                .then(module => {
                    const AttributeSummaryManager = module.default;
                    const attributeSummaryManager = new AttributeSummaryManager();
                    
                    // 初始化时更新属性统计
                    attributeSummaryManager.updateAttributeCounts();
                    
                    // 在保存属性后更新属性统计
                    $('#save-properties').on('click', function() {
                        setTimeout(() => attributeSummaryManager.updateAttributeCounts(), 100);
                    });
                    
                    // 当添加或删除方块时更新属性统计
                    $(document).on('DOMNodeInserted DOMNodeRemoved', '.draggable-block', function() {
                        setTimeout(() => attributeSummaryManager.updateAttributeCounts(), 100);
                    });
                })
                .catch(error => console.error('加载属性统计管理器失败:', error));
                
            // 导入画布数据管理器
            import('./src/js/canvasDataManager.js')
                .then(module => {
                    const CanvasDataManager = module.default;
                    
                    // 导出JSON按钮点击事件
                    $('#export-json').on('click', function() {
                        // 获取画布中的所有方块
                        const blocks = $('.draggable-block');
                        
                        // 获取画布中的所有文本框
                        const textBoxes = $('.draggable-text-box');
                        
                        // 导出为JSON
                        const jsonData = CanvasDataManager.exportToJSON(blocks, connections, textBoxes);
                        
                        // 创建下载链接
                        const blob = new Blob([jsonData], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'canvas_data_' + new Date().getTime() + '.json';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                        
                        // 显示成功提示
                        showToast('画布数据已成功导出');
                    });
                    
                    // 导入JSON文件事件
                    $('#import-json').on('change', function(e) {
                        const file = e.target.files[0];
                        if (!file) return;
                        
                        const reader = new FileReader();
                        reader.onload = function(event) {
                            try {
                                const jsonData = event.target.result;
                                
                                // 重置计数器和连接状态变量
                                blockCounter = 0;
                                connections = [];
                                startConnector = null;
                                
                                // 导入JSON数据
                                const success = CanvasDataManager.importFromJSON(
                                    jsonData,
                                    // 创建方块的回调函数
                                    (blockType, left, top, id, properties) => {
                                        // 更新计数器
                                        const idParts = id.split('-');
                                        const counter = parseInt(idParts[1]);
                                        if (counter > blockCounter) {
                                            blockCounter = counter;
                                        }
                                        
                                        // 获取原始方块的图标和文本
                                        const originalBlock = $(`.block[data-block-id="${blockType}"]`);
                                        const iconHTML = originalBlock.find('i').prop('outerHTML');
                                        const text = originalBlock.text();
                                        
                                        // 创建方块
                                        const block = $(`<div class="draggable-block" id="${id}" data-block-id="${blockType}">
                                            ${iconHTML}
                                            ${text}
                                            <div class="connector top" data-pos="top"></div>
                                            <div class="connector right" data-pos="right"></div>
                                            <div class="connector bottom" data-pos="bottom"></div>
                                            <div class="connector left" data-pos="left"></div>
                                        </div>`);
                                        
                                        // 存储方块属性
                                        block.data('properties', properties);
                                        
                                        block.css({
                                            left: left + 'px',
                                            top: top + 'px'
                                        });
                                        
                                        $('#canvas').append(block);
                                        
                                        // 使方块可拖动
                                        block.draggable({
                                            containment: 'parent',
                                            cursor: 'move',
                                            start: function() {
                                                $(this).css('z-index', '100');
                                            },
                                            drag: function() {
                                                // 更新连线
                                                updateConnections();
                                            },
                                            stop: function() {
                                                $(this).css('z-index', '10');
                                            }
                                        });
                                        
                                        // 连接点事件
                                        block.find('.connector').on('mousedown', function(e) {
                                            e.stopPropagation();
                                            startConnector = {
                                                element: this,
                                                blockId: id,
                                                position: $(this).data('pos')
                                            };
                                        });
                                    },
                                    // 创建文本框的回调函数
                                    (left, top, id, content, size) => {
                                        // 更新计数器
                                        const idParts = id.split('-');
                                        const counter = parseInt(idParts[1]);
                                        if (counter > blockCounter) {
                                            blockCounter = counter;
                                        }
                                        
                                        // 创建文本框
                                        const textBox = $(`<div class="draggable-text-box" id="${id}" contenteditable="true">${content}</div>`);
                                        
                                        textBox.css({
                                            left: left + 'px',
                                            top: top + 'px',
                                            width: size.width + 'px',
                                            height: size.height + 'px'
                                        });
                                        
                                        $('#canvas').append(textBox);
                                        
                                        // 使文本框可拖动
                                        textBox.draggable({
                                            containment: 'parent',
                                            cursor: 'move',
                                            start: function() {
                                                $(this).css('z-index', '100');
                                            },
                                            stop: function() {
                                                $(this).css('z-index', '10');
                                            }
                                        });
                                        
                                        // 点击时选中文本框内容
                                        textBox.on('click', function(e) {
                                            if (!$(e.target).is('input, textarea')) {
                                                $(this).focus();
                                            }
                                        });
                                    },
                                    // 创建连接的回调函数
                                    (startBlockId, startPosition, endBlockId, endPosition, connectionId) => {
                                        // 确保方块存在后再创建连接
                                        if ($(`#${startBlockId}`).length && $(`#${endBlockId}`).length) {
                                            connections.push({
                                                id: connectionId,
                                                startBlockId: startBlockId,
                                            startPosition: startPosition,
                                            endBlockId: endBlockId,
                                            endPosition: endPosition
                                        });
                                        
                                        // 绘制连线
                                        drawConnection(connectionId, startBlockId, startPosition, endBlockId, endPosition);
                                    }
                                });
                                
                                if (success) {
                                    // 更新属性汇总面板
                                    updateSummaryPanel();
                                    showToast('画布数据已成功导入');
                                } else {
                                    showToast('导入失败：无效的JSON数据');
                                }
                            } catch (error) {
                                console.error('导入JSON数据失败:', error);
                                showToast('导入失败：' + error.message);
                            }
                            
                            // 清空文件输入，以便再次选择同一文件
                            $('#import-json').val('');
                        };
                        
                        reader.readAsText(file);
                    });
                })
                .catch(error => console.error('加载画布数据管理器失败:', error));
        });
    </script>
<script>
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        document.querySelector('.sidebar').classList.toggle('dark-theme');
        document.querySelector('header').classList.toggle('dark-theme');
        
        const btn = document.getElementById('theme-toggle');
        btn.textContent = document.body.classList.contains('dark-theme') ? '浅色模式' : '深色模式';
    }
    
    function toggleCanvasBackground() {
        document.querySelector('.canvas-container').classList.toggle('dotted-background');
        /*$(".canvas-container").css("background-color", "transparent");*/
    }
</script>
</body>
</html>