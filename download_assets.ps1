$ErrorActionPreference = "Stop"
$headers = @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }

function Download-Image {
    param([string]$Url, [string]$Path)
    Write-Host "Downloading $Url to $Path..."
    try {
        Invoke-WebRequest -Uri $Url -OutFile $Path -Headers $headers
        Write-Host "Success." -ForegroundColor Green
    }
    catch {
        Write-Host "Failed to download $Url : $_" -ForegroundColor Red
    }
}

# Ensure directory exists
New-Item -ItemType Directory -Force -Path "public/images/guide" | Out-Null

# --- WORKING URLS (High Quality & Atmospheric) ---
$img_restaurant = "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=1200" # High-end Chinese restaurant
$img_shopping = "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1200" # Luxury mall
$img_nightlife = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1200" # Craft cocktails
$img_haidilao = "https://images.unsplash.com/photo-1563245332-692739e746a7?q=80&w=1200" # Steam/Food close-up
$img_ring = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200" # Modern architecture/atrium
$img_9th = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200" # Neon nightlife
$img_xiaomian = "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=1200" # Noodles steaming

# Landmarks (Landmark category)
$img_hongya = "https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=1200" # Hongya Cave Night
$img_liziba = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200" # Modern city towers (placeholder for Liziba)
$img_cableway = "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=1200" # River view

# NEW: Ancient Chinese Architecture for Monument category
$img_ancient = "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1200" # Ancient temple/palace

# --- DOWNLOADS ---

# 1. Categories
Download-Image -Url $img_restaurant -Path "public/images/guide/cat_restaurant.jpg"
Download-Image -Url $img_shopping -Path "public/images/guide/cat_shopping.jpg"
Download-Image -Url $img_nightlife -Path "public/images/guide/cat_nightlife.jpg"
Download-Image -Url $img_xiaomian -Path "public/images/guide/cat_breakfast.jpg"
Download-Image -Url $img_ancient -Path "public/images/guide/cat_monument.jpg"

# 2. Places
Download-Image -Url $img_hongya -Path "public/images/guide/sight_hongya.jpg"
Download-Image -Url $img_liziba -Path "public/images/guide/sight_liziba.jpg"
Download-Image -Url $img_cableway -Path "public/images/guide/sight_cableway.jpg"

Download-Image -Url $img_restaurant -Path "public/images/guide/food_peijie.jpg"
Download-Image -Url $img_haidilao -Path "public/images/guide/food_haidilao.jpg"
Download-Image -Url $img_xiaomian -Path "public/images/guide/food_xiaomian.jpg"

Download-Image -Url $img_ring -Path "public/images/guide/shop_ring.jpg"
Download-Image -Url $img_shopping -Path "public/images/guide/shop_jiefangbei.jpg"

Download-Image -Url $img_nightlife -Path "public/images/guide/night_9thstreet.jpg"
