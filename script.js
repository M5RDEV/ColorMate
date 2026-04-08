// ColorMate - JavaScript Functions

// Theme Toggle
const themeToggle = document.getElementById('darkModeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
}

// Tab Navigation
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab
        tab.classList.add('active');

        // Show corresponding content
        const targetTab = tab.getAttribute('data-tab');
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showCopiedAlert();
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function showCopiedAlert() {
    const alert = document.querySelector('.copied-alert');
    alert.classList.add('show');
    setTimeout(() => {
        alert.classList.remove('show');
    }, 2000);
}

// Color Palettes
const paletteTypes = document.querySelectorAll('.palette-type');
const palettesContainer = document.getElementById('palettesContainer');

const colorPalettes = {
    modern: [
        { name: 'Ocean Blue', colors: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd'] },
        { name: 'Sunset Orange', colors: ['#ea580c', '#f97316', '#fb923c', '#fed7aa'] },
        { name: 'Forest Green', colors: ['#166534', '#16a34a', '#4ade80', '#86efac'] },
        { name: 'Royal Purple', colors: ['#7c3aed', '#a855f7', '#c084fc', '#ddd6fe'] },
        { name: 'Coral Pink', colors: ['#be185d', '#ec4899', '#f472b6', '#fbcfe8'] },
        { name: 'Teal Blue', colors: ['#0f766e', '#14b8a6', '#5eead4', '#a7f3d0'] },
        { name: 'Electric Indigo', colors: ['#312e81', '#4338ca', '#6366f1', '#a5b4fc'] },
        { name: 'Amber Gold', colors: ['#92400e', '#d97706', '#f59e0b', '#fbbf24'] },
        { name: 'Emerald Green', colors: ['#064e3b', '#065f46', '#047857', '#10b981'] },
        { name: 'Violet Purple', colors: ['#581c87', '#7c3aed', '#8b5cf6', '#a78bfa'] }
    ],
    pastel: [
        { name: 'Soft Mint', colors: ['#a7f3d0', '#d1fae5', '#ecfdf5', '#f0fdf4'] },
        { name: 'Baby Blue', colors: ['#bfdbfe', '#dbeafe', '#eff6ff', '#f8fafc'] },
        { name: 'Lavender', colors: ['#ddd6fe', '#ede9fe', '#f3e8ff', '#faf5ff'] },
        { name: 'Peach', colors: ['#fed7aa', '#ffedd5', '#fff7ed', '#fffaf9'] },
        { name: 'Rose', colors: ['#fecdd3', '#fce7f3', '#fdf2f8', '#fef7ff'] },
        { name: 'Sage', colors: ['#d1fae5', '#ecfdf5', '#f0fdf4', '#f7f9f7'] },
        { name: 'Lilac', colors: ['#e9d5ff', '#f3e8ff', '#faf5ff', '#fdf4ff'] },
        { name: 'Sky Blue', colors: ['#bae6fd', '#dbeafe', '#f0f9ff', '#f8fafc'] },
        { name: 'Mint Green', colors: ['#a7f3d0', '#d1fae5', '#ecfdf5', '#f0fdf4'] },
        { name: 'Soft Pink', colors: ['#fce7f3', '#fdf2f8', '#fef7ff', '#fff7f9'] }
    ],
    neon: [
        { name: 'Electric Blue', colors: ['#1e40af', '#2563eb', '#3b82f6', '#60a5fa'] },
        { name: 'Hot Pink', colors: ['#be185d', '#db2777', '#ec4899', '#f472b6'] },
        { name: 'Lime Green', colors: ['#166534', '#22c55e', '#4ade80', '#84cc16'] },
        { name: 'Bright Yellow', colors: ['#ca8a04', '#eab308', '#facc15', '#fef08a'] },
        { name: 'Neon Orange', colors: ['#c2410c', '#ea580c', '#f97316', '#fb923c'] },
        { name: 'Purple Glow', colors: ['#7c3aed', '#9333ea', '#a855f7', '#c084fc'] },
        { name: 'Cyan Bright', colors: ['#0891b2', '#06b6d4', '#22d3ee', '#67e8f9'] },
        { name: 'Magenta', colors: ['#be185d', '#db2777', '#ec4899', '#f472b6'] },
        { name: 'Electric Green', colors: ['#15803d', '#16a34a', '#22c55e', '#4ade80'] },
        { name: 'Neon Red', colors: ['#dc2626', '#ef4444', '#f87171', '#fca5a5'] }
    ],
    vintage: [
        { name: 'Sepia', colors: ['#92400e', '#b45309', '#d97706', '#f59e0b'] },
        { name: 'Burgundy', colors: ['#7f1d1d', '#991b1b', '#dc2626', '#ef4444'] },
        { name: 'Olive', colors: ['#365314', '#4d7c0f', '#65a30d', '#84cc16'] },
        { name: 'Navy', colors: ['#1e3a8a', '#1e40af', '#2563eb', '#3b82f6'] },
        { name: 'Mustard', colors: ['#92400e', '#b45309', '#d97706', '#f59e0b'] },
        { name: 'Rust', colors: ['#9a3412', '#c2410c', '#ea580c', '#f97316'] },
        { name: 'Wine Red', colors: ['#7f1d1d', '#991b1b', '#b91c1c', '#dc2626'] },
        { name: 'Forest Brown', colors: ['#78350f', '#92400e', '#a16207', '#b45309'] },
        { name: 'Deep Blue', colors: ['#1e3a8a', '#1e40af', '#1d4ed8', '#2563eb'] },
        { name: 'Golden Brown', colors: ['#92400e', '#b45309', '#d97706', '#eab308'] }
    ],
    nature: [
        { name: 'Forest', colors: ['#14532d', '#166534', '#16a34a', '#22c55e'] },
        { name: 'Ocean', colors: ['#0c4a6e', '#0369a1', '#0284c7', '#0ea5e9'] },
        { name: 'Sunrise', colors: ['#dc2626', '#ea580c', '#f59e0b', '#f97316'] },
        { name: 'Meadow', colors: ['#16a34a', '#22c55e', '#4ade80', '#84cc16'] },
        { name: 'Sky', colors: ['#0369a1', '#0284c7', '#0ea5e9', '#38bdf8'] },
        { name: 'Earth', colors: ['#92400e', '#a16207', '#ca8a04', '#eab308'] },
        { name: 'Mountain', colors: ['#374151', '#4b5563', '#6b7280', '#9ca3af'] },
        { name: 'Desert', colors: ['#92400e', '#b45309', '#d97706', '#f59e0b'] },
        { name: 'Lake', colors: ['#0c4a6e', '#0369a1', '#0284c7', '#0ea5e9'] },
        { name: 'Autumn', colors: ['#dc2626', '#ea580c', '#f59e0b', '#f97316'] }
    ],
    flat: [
        { name: 'Flat Blue', colors: ['#3498db', '#2980b9', '#34495e', '#2c3e50'] },
        { name: 'Flat Green', colors: ['#2ecc71', '#27ae60', '#34495e', '#2c3e50'] },
        { name: 'Flat Purple', colors: ['#9b59b6', '#8e44ad', '#34495e', '#2c3e50'] },
        { name: 'Flat Red', colors: ['#e74c3c', '#c0392b', '#34495e', '#2c3e50'] },
        { name: 'Flat Orange', colors: ['#e67e22', '#d35400', '#34495e', '#2c3e50'] },
        { name: 'Flat Teal', colors: ['#1abc9c', '#16a085', '#34495e', '#2c3e50'] },
        { name: 'Flat Pink', colors: ['#e91e63', '#c2185b', '#34495e', '#2c3e50'] },
        { name: 'Flat Yellow', colors: ['#f1c40f', '#f39c12', '#34495e', '#2c3e50'] },
        { name: 'Flat Gray', colors: ['#95a5a6', '#7f8c8d', '#34495e', '#2c3e50'] },
        { name: 'Flat Cyan', colors: ['#00bcd4', '#0097a7', '#34495e', '#2c3e50'] }
    ],
    material: [
        { name: 'Material Red', colors: ['#f44336', '#e53935', '#d32f2f', '#c62828'] },
        { name: 'Material Blue', colors: ['#2196f3', '#1976d2', '#1565c0', '#0d47a1'] },
        { name: 'Material Green', colors: ['#4caf50', '#388e3c', '#2e7d32', '#1b5e20'] },
        { name: 'Material Yellow', colors: ['#ffeb3b', '#fdd835', '#f9a825', '#f57f17'] },
        { name: 'Material Purple', colors: ['#9c27b0', '#7b1fa2', '#6a1b9a', '#4a148c'] },
        { name: 'Material Orange', colors: ['#ff9800', '#f57c00', '#e65100', '#bf360c'] },
        { name: 'Material Pink', colors: ['#e91e63', '#d81b60', '#c2185b', '#ad1457'] },
        { name: 'Material Indigo', colors: ['#3f51b5', '#303f9f', '#283593', '#1a237e'] },
        { name: 'Material Teal', colors: ['#009688', '#00897b', '#00796b', '#004d40'] },
        { name: 'Material Brown', colors: ['#795548', '#6d4c41', '#5d4037', '#4e342e'] }
    ],
    warm: [
        { name: 'Warm Sunset', colors: ['#ff6b35', '#f7931e', '#ffb627', '#ffd23f'] },
        { name: 'Autumn Leaves', colors: ['#d7263d', '#f46036', '#f49e4c', '#f7dc6f'] },
        { name: 'Golden Hour', colors: ['#ff9505', '#ffb627', '#ffd23f', '#fff3cd'] },
        { name: 'Fire Orange', colors: ['#ff4500', '#ff6b35', '#f7931e', '#ffb627'] },
        { name: 'Amber Glow', colors: ['#ff8c00', '#ffb627', '#ffd23f', '#fff8e1'] },
        { name: 'Cinnamon', colors: ['#d2691e', '#cd853f', '#daa520', '#f4a460'] },
        { name: 'Terracotta', colors: ['#e2725b', '#ff8c69', '#ffb088', '#ffd5b8'] },
        { name: 'Copper', colors: ['#b87333', '#cd7f32', '#daa520', '#f4c430'] },
        { name: 'Warm Peach', colors: ['#ffb3ba', '#ffdfba', '#ffffba', '#baffc9'] },
        { name: 'Sunflower', colors: ['#ffd23f', '#ffb627', '#ff9505', '#ff6b35'] }
    ],
    cool: [
        { name: 'Cool Blues', colors: ['#0066cc', '#0099ff', '#33ccff', '#66d9ff'] },
        { name: 'Icy Mint', colors: ['#a8e6cf', '#dcedc8', '#ffd3b6', '#ffaaa5'] },
        { name: 'Arctic Blue', colors: ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6'] },
        { name: 'Frost Green', colors: ['#e8f5e8', '#c8e6c9', '#a5d6a7', '#81c784'] },
        { name: 'Winter Sky', colors: ['#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8'] },
        { name: 'Cool Gray', colors: ['#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd'] },
        { name: 'Aqua Marine', colors: ['#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1'] },
        { name: 'Silver Blue', colors: ['#eceff1', '#cfd8dc', '#b0bec5', '#90a4ae'] },
        { name: 'Mint Frost', colors: ['#f1f8e9', '#dcedc8', '#c5e1a5', '#aed581'] },
        { name: 'Cool Lavender', colors: ['#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8'] }
    ],
    monochromatic: [
        { name: 'Blue Shades', colors: ['#0d47a1', '#1565c0', '#1976d2', '#2196f3'] },
        { name: 'Green Tones', colors: ['#1b5e20', '#2e7d32', '#388e3c', '#4caf50'] },
        { name: 'Purple Hues', colors: ['#4a148c', '#6a1b9a', '#7b1fa2', '#9c27b0'] },
        { name: 'Red Spectrum', colors: ['#b71c1c', '#d32f2f', '#f44336', '#e57373'] },
        { name: 'Orange Range', colors: ['#e65100', '#f57c00', '#ff9800', '#ffb74d'] },
        { name: 'Gray Scale', colors: ['#212121', '#424242', '#616161', '#9e9e9e'] },
        { name: 'Pink Shades', colors: ['#880e4f', '#ad1457', '#c2185b', '#e91e63'] },
        { name: 'Teal Depth', colors: ['#004d40', '#00695c', '#00897b', '#009688'] },
        { name: 'Amber Light', colors: ['#ff6f00', '#ff8f00', '#ffa000', '#ffb300'] },
        { name: 'Indigo Night', colors: ['#1a237e', '#283593', '#303f9f', '#3f51b5'] }
    ],
    corporate: [
        { name: 'Business Blue', colors: ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd'] },
        { name: 'Executive Gray', colors: ['#374151', '#6b7280', '#9ca3af', '#d1d5db'] },
        { name: 'Trust Green', colors: ['#065f46', '#047857', '#10b981', '#34d399'] },
        { name: 'Authority Red', colors: ['#991b1b', '#dc2626', '#ef4444', '#fca5a5'] },
        { name: 'Professional Navy', colors: ['#1e3a8a', '#1e40af', '#3b82f6', '#60a5fa'] },
        { name: 'Corporate Purple', colors: ['#581c87', '#7c3aed', '#8b5cf6', '#a78bfa'] },
        { name: 'Success Gold', colors: ['#92400e', '#d97706', '#f59e0b', '#fbbf24'] },
        { name: 'Clean White', colors: ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db'] },
        { name: 'Tech Blue', colors: ['#0369a1', '#0284c7', '#0ea5e9', '#38bdf8'] },
        { name: 'Modern Black', colors: ['#111827', '#1f2937', '#374151', '#6b7280'] }
    ],
    retro: [
        { name: '70s Disco', colors: ['#ff0080', '#00ff80', '#8000ff', '#ffff00'] },
        { name: '80s Neon', colors: ['#ff1493', '#00ffff', '#ff00ff', '#ffff00'] },
        { name: '90s Grunge', colors: ['#8b0000', '#006400', '#00008b', '#ffff00'] },
        { name: 'Retro Orange', colors: ['#ff4500', '#ffa500', '#ffff00', '#32cd32'] },
        { name: 'Vintage Pink', colors: ['#ffb6c1', '#ff69b4', '#dc143c', '#8b0000'] },
        { name: 'Classic Blue', colors: ['#000080', '#0000ff', '#4169e1', '#87ceeb'] },
        { name: 'Retro Green', colors: ['#006400', '#008000', '#32cd32', '#90ee90'] },
        { name: 'Disco Fever', colors: ['#ff00ff', '#00ffff', '#ffff00', '#ff0000'] },
        { name: 'Arcade Colors', colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'] },
        { name: 'Retro Purple', colors: ['#800080', '#8a2be2', '#dda0dd', '#ee82ee'] }
    ],
    minimal: [
        { name: 'Pure White', colors: ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6'] },
        { name: 'Clean Gray', colors: ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da'] },
        { name: 'Soft Black', colors: ['#212529', '#343a40', '#495057', '#6c757d'] },
        { name: 'Minimal Blue', colors: ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6'] },
        { name: 'Simple Green', colors: ['#e8f5e8', '#c8e6c9', '#a5d6a7', '#81c784'] },
        { name: 'Clean Red', colors: ['#ffebee', '#ffcdd2', '#ef9a9a', '#e57373'] },
        { name: 'Pure Yellow', colors: ['#fffde7', '#fff9c4', '#fff59d', '#fff176'] },
        { name: 'Soft Purple', colors: ['#f3e5f5', '#e1bee7', '#ce93d8', '#ba68c8'] },
        { name: 'Minimal Orange', colors: ['#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d'] },
        { name: 'Clean Teal', colors: ['#e0f2f1', '#b2dfdb', '#80cbc4', '#4db6ac'] }
    ],
    vibrant: [
        { name: 'Electric Rainbow', colors: ['#ff0000', '#ff8000', '#ffff00', '#80ff00'] },
        { name: 'Vivid Ocean', colors: ['#00ffff', '#0080ff', '#8000ff', '#ff00ff'] },
        { name: 'Bright Spring', colors: ['#ff0080', '#ff8000', '#ffff00', '#80ff00'] },
        { name: 'Neon Party', colors: ['#ff00ff', '#00ffff', '#ffff00', '#ff0000'] },
        { name: 'Color Burst', colors: ['#ff4500', '#ff1493', '#00ff7f', '#00bfff'] },
        { name: 'Vibrant Mix', colors: ['#ff6b35', '#f7931e', '#ffff00', '#00ff00'] },
        { name: 'Bright Energy', colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00'] },
        { name: 'Color Pop', colors: ['#ff69b4', '#00ced1', '#ffd700', '#ff6347'] },
        { name: 'Vivid Spectrum', colors: ['#dc143c', '#ff4500', '#ffd700', '#32cd32'] },
        { name: 'Bright Fusion', colors: ['#ff1493', '#00ffff', '#ffff00', '#ff4500'] }
    ],
    earthy: [
        { name: 'Forest Floor', colors: ['#8b4513', '#a0522d', '#daa520', '#f4a460'] },
        { name: 'Desert Sand', colors: ['#f4a460', '#daa520', '#cd853f', '#d2691e'] },
        { name: 'Mountain Stone', colors: ['#696969', '#808080', '#a9a9a9', '#c0c0c0'] },
        { name: 'Clay Pottery', colors: ['#cd853f', '#d2691e', '#b22222', '#8b4513'] },
        { name: 'Autumn Leaves', colors: ['#8b4513', '#a0522d', '#daa520', '#cd853f'] },
        { name: 'River Bed', colors: ['#708090', '#778899', '#b0c4de', '#add8e6'] },
        { name: 'Canyon Walls', colors: ['#a0522d', '#cd853f', '#daa520', '#f4a460'] },
        { name: 'Prairie Grass', colors: ['#556b2f', '#6b8e23', '#9acd32', '#adff2f'] },
        { name: 'Mud Brick', colors: ['#daa520', '#cd853f', '#d2691e', '#a0522d'] },
        { name: 'Stone Path', colors: ['#696969', '#808080', '#a9a9a9', '#c0c0c0'] }
    ],
    metallic: [
        { name: 'Gold Luxury', colors: ['#ffd700', '#ffed4e', '#ffe066', '#ffeb99'] },
        { name: 'Silver Shine', colors: ['#c0c0c0', '#d3d3d3', '#e8e8e8', '#f5f5f5'] },
        { name: 'Bronze Age', colors: ['#cd7f32', '#d4af37', '#b87333', '#a0522d'] },
        { name: 'Chrome Finish', colors: ['#e8e8e8', '#f0f0f0', '#f8f8f8', '#ffffff'] },
        { name: 'Copper Glow', colors: ['#b87333', '#cd7f32', '#d2691e', '#daa520'] },
        { name: 'Steel Blue', colors: ['#4682b4', '#5f9ea0', '#708090', '#778899'] },
        { name: 'Titanium', colors: ['#c0c0c0', '#d3d3d3', '#e0e0e0', '#ebebeb'] },
        { name: 'Platinum', colors: ['#e5e4e2', '#f0f0f0', '#f8f8f8', '#ffffff'] },
        { name: 'Brass Warm', colors: ['#b5a642', '#d4af37', '#ffd700', '#ffed4e'] },
        { name: 'Aluminum', colors: ['#d3d3d3', '#e0e0e0', '#ebebeb', '#f5f5f5'] }
    ],
    jewel: [
        { name: 'Ruby Red', colors: ['#dc143c', '#b22222', '#8b0000', '#ff0000'] },
        { name: 'Sapphire Blue', colors: ['#000080', '#0000cd', '#0000ff', '#4169e1'] },
        { name: 'Emerald Green', colors: ['#006400', '#008000', '#32cd32', '#00ff00'] },
        { name: 'Diamond Clear', colors: ['#f0f8ff', '#e6e6fa', '#fffafa', '#f5f5f5'] },
        { name: 'Amethyst Purple', colors: ['#4b0082', '#6a5acd', '#9370db', '#ba55d3'] },
        { name: 'Topaz Gold', colors: ['#ffd700', '#ffed4e', '#daa520', '#b8860b'] },
        { name: 'Jade Green', colors: ['#00a86b', '#32cd32', '#00ff7f', '#7fff00'] },
        { name: 'Garnet Deep', colors: ['#8b0000', '#a52a2a', '#b22222', '#dc143c'] },
        { name: 'Opal Mystic', colors: ['#f0f8ff', '#e6e6fa', '#dda0dd', '#ffb6c1'] },
        { name: 'Pearl White', colors: ['#f5f5f5', '#fafafa', '#ffffff', '#f8f8f8'] }
    ],
    'pastel-dark': [
        { name: 'Midnight Pastel', colors: ['#2d1b69', '#3d2c8d', '#4c3bb1', '#5b4bd5'] },
        { name: 'Deep Lavender', colors: ['#4c1d95', '#5b21b6', '#6d28d9', '#7c3aed'] },
        { name: 'Dark Mint', colors: ['#064e3b', '#065f46', '#047857', '#059669'] },
        { name: 'Shadow Rose', colors: ['#7d1a4c', '#9d174d', '#be185d', '#db2777'] },
        { name: 'Twilight Blue', colors: ['#1e3a8a', '#1e40af', '#1d4ed8', '#2563eb'] },
        { name: 'Dark Sage', colors: ['#14532d', '#166534', '#15803d', '#16a34a'] },
        { name: 'Noir Peach', colors: ['#9a3412', '#c2410c', '#ea580c', '#f97316'] },
        { name: 'Eclipse Purple', colors: ['#581c87', '#6b21a8', '#7c3aed', '#8b5cf6'] },
        { name: 'Dark Coral', colors: ['#be185d', '#db2777', '#ec4899', '#f472b6'] },
        { name: 'Midnight Teal', colors: ['#0f766e', '#0d9488', '#0f9ca5', '#14b8a6'] }
    ],
    'gradient-inspired': [
        { name: 'Sunrise Blend', colors: ['#ff6b35', '#f7931e', '#ffb627', '#ffd23f'] },
        { name: 'Ocean Flow', colors: ['#667eea', '#764ba2', '#f093fb', '#f5576c'] },
        { name: 'Forest Mist', colors: ['#134e5e', '#71b280', '#9abf88', '#c7e9b0'] },
        { name: 'Purple Haze', colors: ['#a8edea', '#fed6e3', '#d299c2', '#fef9d7'] },
        { name: 'Fire Glow', colors: ['#ff9a9e', '#fecfef', '#fecfef', '#ffecd2'] },
        { name: 'Sky Gradient', colors: ['#667eea', '#764ba2', '#667eea', '#764ba2'] },
        { name: 'Warm Sunset', colors: ['#ff9a9e', '#fecfef', '#fecfef', '#ffecd2'] },
        { name: 'Cool Breeze', colors: ['#a8edea', '#fed6e3', '#d299c2', '#fef9d7'] },
        { name: 'Neon Nights', colors: ['#ff0080', '#ff8000', '#ffff00', '#80ff00'] },
        { name: 'Cosmic Dust', colors: ['#0f0f23', '#1a1a2e', '#16213e', '#0f3460'] }
    ],
    seasonal: [
        { name: 'Spring Bloom', colors: ['#ff69b4', '#ffb6c1', '#ffc0cb', '#ffe4e1'] },
        { name: 'Summer Heat', colors: ['#ff4500', '#ff6347', '#ffa500', '#ffd700'] },
        { name: 'Autumn Gold', colors: ['#daa520', '#f4a460', '#cd853f', '#d2691e'] },
        { name: 'Winter Frost', colors: ['#e0ffff', '#b0e0e6', '#87ceeb', '#4682b4'] },
        { name: 'Cherry Blossom', colors: ['#ffb6c1', '#ff69b4', '#ff1493', '#dc143c'] },
        { name: 'Beach Sunset', colors: ['#ff4500', '#ff6347', '#ffa500', '#ffd700'] },
        { name: 'Harvest Moon', colors: ['#f4a460', '#daa520', '#cd853f', '#8b4513'] },
        { name: 'Snow Flake', colors: ['#f0f8ff', '#e6e6fa', '#b0c4de', '#778899'] },
        { name: 'Tropical Storm', colors: ['#32cd32', '#00ff7f', '#00ced1', '#1e90ff'] },
        { name: 'Holiday Cheer', colors: ['#dc143c', '#008000', '#ffd700', '#ffffff'] }
    ]
};

function renderPalettes(type) {
    const palettes = colorPalettes[type] || colorPalettes.modern;
    palettesContainer.innerHTML = '';

    palettes.forEach(palette => {
        const paletteCard = document.createElement('div');
        paletteCard.className = 'palette-card';

        const colorsDiv = document.createElement('div');
        colorsDiv.className = 'palette-colors';

        palette.colors.forEach(color => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'palette-color';
            colorDiv.style.backgroundColor = color;
            colorDiv.addEventListener('click', () => copyToClipboard(color));
            colorsDiv.appendChild(colorDiv);
        });

        const infoDiv = document.createElement('div');
        infoDiv.className = 'palette-info';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'palette-name';
        nameDiv.textContent = palette.name;

        const hexDiv = document.createElement('div');
        hexDiv.className = 'palette-hex';
        hexDiv.textContent = palette.colors.join(' • ');

        const saveBtn = document.createElement('button');
        saveBtn.className = 'save-btn';
        saveBtn.innerHTML = '<i class="fas fa-heart"></i> حفظ';
        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const paletteData = {
                type: 'palette',
                name: palette.name,
                colors: palette.colors
            };
            saveToFavorites(paletteData);
        });

        infoDiv.appendChild(nameDiv);
        infoDiv.appendChild(hexDiv);
        infoDiv.appendChild(saveBtn);

        paletteCard.appendChild(colorsDiv);
        paletteCard.appendChild(infoDiv);

        palettesContainer.appendChild(paletteCard);
    });
}

paletteTypes.forEach(type => {
    type.addEventListener('click', () => {
        paletteTypes.forEach(t => t.classList.remove('active'));
        type.classList.add('active');
        renderPalettes(type.getAttribute('data-type'));
    });
});

// Initialize with modern palettes
renderPalettes('modern');

// Gradient Generator
let gradientStops = [
    { color: '#ff0000', position: 0 },
    { color: '#0000ff', position: 100 }
];

const gradientPreview = document.getElementById('multiGradientPreview');
const gradientCSS = document.getElementById('gradientCSS');
const addGradientColor = document.getElementById('addGradientColor');
const gradientType = document.getElementById('gradientType');
const gradientDirection = document.getElementById('gradientDirection');
const gradientColorStops = document.getElementById('gradientColorStops');
const saveGradient = document.getElementById('saveGradient');

function updateGradient() {
    const type = gradientType.value;
    const direction = gradientDirection.value;

    let gradientString = '';

    if (type === 'linear') {
        gradientString = `linear-gradient(${direction}, `;
    } else if (type === 'radial') {
        gradientString = `radial-gradient(${direction}, `;
    } else if (type === 'conic') {
        gradientString = `conic-gradient(${direction}, `;
    }

    gradientStops.sort((a, b) => a.position - b.position);
    gradientString += gradientStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
    gradientString += ')';

    gradientPreview.style.background = gradientString;
    gradientCSS.value = `background: ${gradientString};`;

    renderGradientStops();
}

function renderGradientStops() {
    gradientColorStops.innerHTML = '';

    gradientStops.forEach((stop, index) => {
        const stopDiv = document.createElement('div');
        stopDiv.className = 'color-stop';

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = stop.color;
        colorInput.addEventListener('input', (e) => {
            stop.color = e.target.value;
            updateGradient();
        });

        const positionInput = document.createElement('input');
        positionInput.type = 'range';
        positionInput.min = '0';
        positionInput.max = '100';
        positionInput.value = stop.position;
        positionInput.addEventListener('input', (e) => {
            stop.position = parseInt(e.target.value);
            updateGradient();
        });

        const positionLabel = document.createElement('span');
        positionLabel.textContent = `${stop.position}%`;

        if (gradientStops.length > 2) {
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-stop';
            removeBtn.innerHTML = '×';
            removeBtn.addEventListener('click', () => {
                gradientStops.splice(index, 1);
                updateGradient();
            });
            stopDiv.appendChild(removeBtn);
        }

        stopDiv.appendChild(colorInput);
        stopDiv.appendChild(positionInput);
        stopDiv.appendChild(positionLabel);

        gradientColorStops.appendChild(stopDiv);
    });
}

addGradientColor.addEventListener('click', () => {
    if (gradientStops.length < 5) {
        const newStop = {
            color: '#00ff00',
            position: Math.floor(Math.random() * 100)
        };
        gradientStops.push(newStop);
        updateGradient();
    }
});

gradientType.addEventListener('change', updateGradient);
gradientDirection.addEventListener('change', updateGradient);

document.getElementById('copyGradientCSS').addEventListener('click', () => {
    copyToClipboard(gradientCSS.value);
});

saveGradient.addEventListener('click', () => {
    const gradient = {
        type: 'gradient',
        css: gradientCSS.value,
        stops: gradientStops,
        gradientType: gradientType.value,
        direction: gradientDirection.value
    };
    saveToFavorites(gradient);
});

// Suggested Gradients
const suggestedGradients = [
    // Popular
    { name: 'Ocean Breeze', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', category: 'popular' },
    { name: 'Sunset', css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', category: 'popular' },
    { name: 'Forest', css: 'linear-gradient(135deg, #134e5e 0%, #71b280 100%)', category: 'popular' },
    { name: 'Fire', css: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)', category: 'popular' },
    { name: 'Sky', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', category: 'popular' },
    { name: 'Purple Dream', css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', category: 'popular' },
    { name: 'Cosmic', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', category: 'popular' },
    { name: 'Warm Flame', css: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)', category: 'popular' },

    // Colorful
    { name: 'Rainbow', css: 'linear-gradient(135deg, #ff0000 0%, #ff7f00 14%, #ffff00 28%, #00ff00 42%, #0000ff 57%, #4b0082 71%, #9400d3 85%)', category: 'colorful' },
    { name: 'Tropical', css: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #ffb627 50%, #00d4ff 75%, #090088 100%)', category: 'colorful' },
    { name: 'Neon Party', css: 'linear-gradient(135deg, #ff0080 0%, #ff8000 25%, #ffff00 50%, #80ff00 75%, #00ff80 100%)', category: 'colorful' },
    { name: 'Ocean Deep', css: 'linear-gradient(135deg, #001122 0%, #003366 25%, #0066cc 50%, #0099ff 75%, #33ccff 100%)', category: 'colorful' },
    { name: 'Sunset Beach', css: 'linear-gradient(135deg, #ff4500 0%, #ff6b35 20%, #ffb627 40%, #ffd23f 60%, #ffff99 80%, #ffffff 100%)', category: 'colorful' },
    { name: 'Forest Mystery', css: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #e94560 100%)', category: 'colorful' },

    // Pastel
    { name: 'Soft Pastel', css: 'linear-gradient(135deg, #ffb3ba 0%, #ffdfba 25%, #ffffba 50%, #baffc9 75%, #bae1ff 100%)', category: 'pastel' },
    { name: 'Cotton Candy', css: 'linear-gradient(135deg, #ffb3ba 0%, #ffdfba 33%, #ffffba 66%, #baffc9 100%)', category: 'pastel' },
    { name: 'Mint Breeze', css: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc8 33%, #ffd3b6 66%, #ffaaa5 100%)', category: 'pastel' },
    { name: 'Lavender Fields', css: 'linear-gradient(135deg, #e8d5ff 0%, #f3e8ff 33%, #fff8e7 66%, #ffe8d6 100%)', category: 'pastel' },
    { name: 'Baby Blue', css: 'linear-gradient(135deg, #bae6fd 0%, #dbeafe 33%, #f0f9ff 66%, #fefefe 100%)', category: 'pastel' },
    { name: 'Rose Garden', css: 'linear-gradient(135deg, #fecdd3 0%, #fce7f3 33%, #fdf2f8 66%, #fef7ff 100%)', category: 'pastel' },

    // Neon
    { name: 'Neon Glow', css: 'linear-gradient(135deg, #ff0080 0%, #ff8000 25%, #ffff00 50%, #80ff00 75%, #00ff80 100%)', category: 'neon' },
    { name: 'Electric Blue', css: 'linear-gradient(135deg, #0066cc 0%, #0099ff 25%, #33ccff 50%, #66d9ff 75%, #99e6ff 100%)', category: 'neon' },
    { name: 'Neon Pink', css: 'linear-gradient(135deg, #ff1493 0%, #ff69b4 33%, #ffb6c1 66%, #ffc0cb 100%)', category: 'neon' },
    { name: 'Cyber Punk', css: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 33%, #ffff00 66%, #ff0000 100%)', category: 'neon' },
    { name: 'Neon Green', css: 'linear-gradient(135deg, #00ff00 0%, #39ff14 33%, #7fff00 66%, #adff2f 100%)', category: 'neon' },
    { name: 'Purple Neon', css: 'linear-gradient(135deg, #8a2be2 0%, #9932cc 33%, #ba55d3 66%, #da70d6 100%)', category: 'neon' },

    // Sunset
    { name: 'Golden Hour', css: 'linear-gradient(135deg, #ff9505 0%, #ffb627 25%, #ffd23f 50%, #fff3cd 75%, #ffffff 100%)', category: 'sunset' },
    { name: 'Desert Sunset', css: 'linear-gradient(135deg, #ff4500 0%, #ff6b35 25%, #ffb627 50%, #ffd23f 75%, #ffff99 100%)', category: 'sunset' },
    { name: 'Ocean Sunset', css: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #ffb627 50%, #00d4ff 75%, #090088 100%)', category: 'sunset' },
    { name: 'Mountain Sunset', css: 'linear-gradient(135deg, #ff4500 0%, #ff6b35 20%, #ffb627 40%, #ffd23f 60%, #ffff99 80%, #ffffff 100%)', category: 'sunset' },
    { name: 'Tropical Sunset', css: 'linear-gradient(135deg, #ff7f50 0%, #ff6347 25%, #ff4500 50%, #dc143c 75%, #8b0000 100%)', category: 'sunset' },
    { name: 'Arctic Sunset', css: 'linear-gradient(135deg, #ffb6c1 0%, #ffa07a 25%, #ff7f50 50%, #ff6347 75%, #ff4500 100%)', category: 'sunset' },

    // Cosmic
    { name: 'Galaxy', css: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #e94560 100%)', category: 'cosmic' },
    { name: 'Starry Night', css: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #2d1b69 50%, #11998e 75%, #38ef7d 100%)', category: 'cosmic' },
    { name: 'Cosmic Purple', css: 'linear-gradient(135deg, #4a0e4e 0%, #7b2cbf 25%, #9d4edd 50%, #c77dff 75%, #e0aaff 100%)', category: 'cosmic' },
    { name: 'Deep Space', css: 'linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #1e3a8a 100%)', category: 'cosmic' },
    { name: 'Nebula', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)', category: 'cosmic' },
    { name: 'Aurora', css: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 20%, #16213e 40%, #0f3460 60%, #38ef7d 80%, #11998e 100%)', category: 'cosmic' },

    // Warm
    { name: 'Warm Autumn', css: 'linear-gradient(135deg, #d7263d 0%, #f46036 25%, #f49e4c 50%, #f7dc6f 75%, #fdf4dc 100%)', category: 'warm' },
    { name: 'Cozy Fire', css: 'linear-gradient(135deg, #8b0000 0%, #dc143c 25%, #ff4500 50%, #ff6347 75%, #ffa07a 100%)', category: 'warm' },
    { name: 'Golden Wheat', css: 'linear-gradient(135deg, #daa520 0%, #f4c430 25%, #ffd700 50%, #ffed4e 75%, #fff8dc 100%)', category: 'warm' },
    { name: 'Amber Glow', css: 'linear-gradient(135deg, #ff8c00 0%, #ffb627 25%, #ffd23f 50%, #fff3cd 75%, #ffffff 100%)', category: 'warm' },
    { name: 'Cinnamon Spice', css: 'linear-gradient(135deg, #d2691e 0%, #cd853f 25%, #daa520 50%, #f4a460 75%, #fff8dc 100%)', category: 'warm' },
    { name: 'Terracotta Warm', css: 'linear-gradient(135deg, #e2725b 0%, #ff8c69 25%, #ffb088 50%, #ffd5b8 75%, #fff8e7 100%)', category: 'warm' },

    // Cool
    { name: 'Cool Breeze', css: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 25%, #90caf9 50%, #64b5f6 75%, #42a5f5 100%)', category: 'cool' },
    { name: 'Icy Blue', css: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 25%, #80deea 50%, #4dd0e1 75%, #26c6da 100%)', category: 'cool' },
    { name: 'Mint Fresh', css: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 25%, #a5d6a7 50%, #81c784 75%, #66bb6a 100%)', category: 'cool' },
    { name: 'Arctic Wind', css: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 25%, #ce93d8 50%, #ba68c8 75%, #ab47bc 100%)', category: 'cool' },
    { name: 'Silver Frost', css: 'linear-gradient(135deg, #eceff1 0%, #cfd8dc 25%, #b0bec5 50%, #90a4ae 75%, #78909c 100%)', category: 'cool' },
    { name: 'Cool Aqua', css: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 25%, #80cbc4 50%, #4db6ac 75%, #26a69a 100%)', category: 'cool' },

    // Corporate
    { name: 'Business Professional', css: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #60a5fa 50%, #93c5fd 75%, #dbeafe 100%)', category: 'corporate' },
    { name: 'Executive Suite', css: 'linear-gradient(135deg, #374151 0%, #6b7280 25%, #9ca3af 50%, #d1d5db 75%, #f3f4f6 100%)', category: 'corporate' },
    { name: 'Trust Building', css: 'linear-gradient(135deg, #065f46 0%, #047857 25%, #10b981 50%, #34d399 75%, #a7f3d0 100%)', category: 'corporate' },
    { name: 'Authority Red', css: 'linear-gradient(135deg, #991b1b 0%, #dc2626 25%, #ef4444 50%, #fca5a5 75%, #fecaca 100%)', category: 'corporate' },
    { name: 'Corporate Navy', css: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 25%, #3b82f6 50%, #60a5fa 75%, #93c5fd 100%)', category: 'corporate' },
    { name: 'Success Gold', css: 'linear-gradient(135deg, #92400e 0%, #d97706 25%, #f59e0b 50%, #fbbf24 75%, #fde68a 100%)', category: 'corporate' },

    // Retro
    { name: '70s Groove', css: 'linear-gradient(135deg, #ff0080 0%, #00ff80 25%, #8000ff 50%, #ffff00 75%, #ff8000 100%)', category: 'retro' },
    { name: '80s Synthwave', css: 'linear-gradient(135deg, #ff1493 0%, #00ffff 25%, #ff00ff 50%, #ffff00 75%, #ff4500 100%)', category: 'retro' },
    { name: '90s Grunge', css: 'linear-gradient(135deg, #8b0000 0%, #006400 25%, #00008b 50%, #ffff00 75%, #ff0000 100%)', category: 'retro' },
    { name: 'Retro Sunset', css: 'linear-gradient(135deg, #ff4500 0%, #ffa500 25%, #ffff00 50%, #32cd32 75%, #0000ff 100%)', category: 'retro' },
    { name: 'Vintage Hollywood', css: 'linear-gradient(135deg, #ffb6c1 0%, #ff69b4 25%, #dc143c 50%, #8b0000 75%, #000000 100%)', category: 'retro' },
    { name: 'Classic Denim', css: 'linear-gradient(135deg, #000080 0%, #0000ff 25%, #4169e1 50%, #87ceeb 75%, #ffffff 100%)', category: 'retro' },

    // Minimal
    { name: 'Pure Minimal', css: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 25%, #e9ecef 50%, #dee2e6 75%, #ced4da 100%)', category: 'minimal' },
    { name: 'Gray Scale', css: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 25%, #dee2e6 50%, #ced4da 75%, #adb5bd 100%)', category: 'minimal' },
    { name: 'Soft Black', css: 'linear-gradient(135deg, #212529 0%, #343a40 25%, #495057 50%, #6c757d 75%, #adb5bd 100%)', category: 'minimal' },
    { name: 'Clean Blue', css: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 25%, #90caf9 50%, #64b5f6 75%, #42a5f5 100%)', category: 'minimal' },
    { name: 'Simple Green', css: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 25%, #a5d6a7 50%, #81c784 75%, #66bb6a 100%)', category: 'minimal' },
    { name: 'Minimal White', css: 'linear-gradient(135deg, #ffffff 0%, #fafafa 25%, #f5f5f5 50%, #eeeeee 75%, #e0e0e0 100%)', category: 'minimal' },

    // Vibrant
    { name: 'Electric Rainbow', css: 'linear-gradient(135deg, #ff0000 0%, #ff8000 20%, #ffff00 40%, #80ff00 60%, #00ff80 80%, #0080ff 100%)', category: 'vibrant' },
    { name: 'Neon Party', css: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 25%, #ffff00 50%, #ff0000 75%, #00ff00 100%)', category: 'vibrant' },
    { name: 'Color Explosion', css: 'linear-gradient(135deg, #ff4500 0%, #ff1493 20%, #00ff7f 40%, #00bfff 60%, #8a2be2 80%, #ffd700 100%)', category: 'vibrant' },
    { name: 'Vivid Spectrum', css: 'linear-gradient(135deg, #ff0000 0%, #ff7f00 16%, #ffff00 33%, #00ff00 50%, #0000ff 66%, #4b0082 83%, #9400d3 100%)', category: 'vibrant' },
    { name: 'Bright Energy', css: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #ffff00 50%, #00ff00 75%, #00ffff 100%)', category: 'vibrant' },
    { name: 'Color Pop', css: 'linear-gradient(135deg, #ff69b4 0%, #00ced1 25%, #ffd700 50%, #ff6347 75%, #9370db 100%)', category: 'vibrant' },

    // Earthy
    { name: 'Forest Floor', css: 'linear-gradient(135deg, #8b4513 0%, #a0522d 25%, #daa520 50%, #f4a460 75%, #fff8dc 100%)', category: 'earthy' },
    { name: 'Desert Dunes', css: 'linear-gradient(135deg, #f4a460 0%, #daa520 25%, #cd853f 50%, #d2691e 75%, #a0522d 100%)', category: 'earthy' },
    { name: 'Mountain Stone', css: 'linear-gradient(135deg, #696969 0%, #808080 25%, #a9a9a9 50%, #c0c0c0 75%, #d3d3d3 100%)', category: 'earthy' },
    { name: 'Clay Pottery', css: 'linear-gradient(135deg, #cd853f 0%, #d2691e 25%, #b22222 50%, #8b4513 75%, #654321 100%)', category: 'earthy' },
    { name: 'Autumn Leaves', css: 'linear-gradient(135deg, #8b4513 0%, #a0522d 20%, #daa520 40%, #cd853f 60%, #d2691e 80%, #8b4513 100%)', category: 'earthy' },
    { name: 'River Bed', css: 'linear-gradient(135deg, #708090 0%, #778899 25%, #b0c4de 50%, #add8e6 75%, #e0ffff 100%)', category: 'earthy' },

    // Metallic
    { name: 'Gold Luxury', css: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #ffe066 50%, #ffeb99 75%, #fff8dc 100%)', category: 'metallic' },
    { name: 'Silver Shine', css: 'linear-gradient(135deg, #c0c0c0 0%, #d3d3d3 25%, #e8e8e8 50%, #f5f5f5 75%, #ffffff 100%)', category: 'metallic' },
    { name: 'Bronze Age', css: 'linear-gradient(135deg, #cd7f32 0%, #d4af37 25%, #b87333 50%, #a0522d 75%, #654321 100%)', category: 'metallic' },
    { name: 'Chrome Finish', css: 'linear-gradient(135deg, #e8e8e8 0%, #f0f0f0 25%, #f8f8f8 50%, #ffffff 75%, #fafafa 100%)', category: 'metallic' },
    { name: 'Copper Glow', css: 'linear-gradient(135deg, #b87333 0%, #cd7f32 25%, #d2691e 50%, #daa520 75%, #f4a460 100%)', category: 'metallic' },
    { name: 'Steel Blue', css: 'linear-gradient(135deg, #4682b4 0%, #5f9ea0 25%, #708090 50%, #778899 75%, #b0c4de 100%)', category: 'metallic' },

    // Jewel
    { name: 'Ruby Red', css: 'linear-gradient(135deg, #dc143c 0%, #b22222 25%, #8b0000 50%, #ff0000 75%, #ff6347 100%)', category: 'jewel' },
    { name: 'Sapphire Blue', css: 'linear-gradient(135deg, #000080 0%, #0000cd 25%, #0000ff 50%, #4169e1 75%, #87ceeb 100%)', category: 'jewel' },
    { name: 'Emerald Green', css: 'linear-gradient(135deg, #006400 0%, #008000 25%, #32cd32 50%, #00ff00 75%, #7fff00 100%)', category: 'jewel' },
    { name: 'Amethyst Purple', css: 'linear-gradient(135deg, #4b0082 0%, #6a5acd 25%, #9370db 50%, #ba55d3 75%, #da70d6 100%)', category: 'jewel' },
    { name: 'Topaz Gold', css: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #daa520 50%, #b8860b 75%, #daa520 100%)', category: 'jewel' },
    { name: 'Jade Green', css: 'linear-gradient(135deg, #00a86b 0%, #32cd32 25%, #00ff7f 50%, #7fff00 75%, #adff2f 100%)', category: 'jewel' },

    // Seasonal
    { name: 'Spring Bloom', css: 'linear-gradient(135deg, #ff69b4 0%, #ffb6c1 20%, #ffc0cb 40%, #ffe4e1 60%, #fff0f5 80%, #ffffff 100%)', category: 'seasonal' },
    { name: 'Summer Heat', css: 'linear-gradient(135deg, #ff4500 0%, #ff6347 25%, #ffa500 50%, #ffd700 75%, #ffff00 100%)', category: 'seasonal' },
    { name: 'Autumn Gold', css: 'linear-gradient(135deg, #daa520 0%, #f4a460 25%, #cd853f 50%, #d2691e 75%, #8b4513 100%)', category: 'seasonal' },
    { name: 'Winter Frost', css: 'linear-gradient(135deg, #e0ffff 0%, #b0e0e6 25%, #87ceeb 50%, #4682b4 75%, #000080 100%)', category: 'seasonal' },
    { name: 'Cherry Blossom', css: 'linear-gradient(135deg, #ffb6c1 0%, #ff69b4 25%, #ff1493 50%, #dc143c 75%, #b22222 100%)', category: 'seasonal' },
    { name: 'Holiday Cheer', css: 'linear-gradient(135deg, #dc143c 0%, #008000 33%, #ffd700 66%, #ffffff 100%)', category: 'seasonal' }
];

const suggestedGradientsContainer = document.getElementById('suggestedGradients');
const gradientCategoryBtns = document.querySelectorAll('.gradient-category-btn');
const gradientTypeBtns = document.querySelectorAll('.gradient-type-btn');

function renderSuggestedGradients(category = 'popular', type = 'linear') {
    const filteredGradients = suggestedGradients.filter(gradient => {
        const categoryMatch = category === 'all' || gradient.category === category;
        const typeMatch = type === 'all' || gradient.css.includes(type);
        return categoryMatch && typeMatch;
    });

    suggestedGradientsContainer.innerHTML = '';

    filteredGradients.forEach(gradient => {
        const gradientCard = document.createElement('div');
        gradientCard.className = 'gradient-card';
        gradientCard.style.background = gradient.css;

        const infoDiv = document.createElement('div');
        infoDiv.className = 'gradient-info';
        infoDiv.textContent = gradient.name;

        const saveBtn = document.createElement('button');
        saveBtn.className = 'save-btn';
        saveBtn.innerHTML = '<i class="fas fa-heart"></i>';
        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const gradientData = {
                type: 'gradient',
                name: gradient.name,
                css: gradient.css,
                category: gradient.category
            };
            saveToFavorites(gradientData);
        });

        gradientCard.addEventListener('click', () => {
            copyToClipboard(`background: ${gradient.css};`);
        });

        gradientCard.appendChild(infoDiv);
        gradientCard.appendChild(saveBtn);
        suggestedGradientsContainer.appendChild(gradientCard);
    });
}

gradientCategoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        gradientCategoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSuggestedGradients(btn.getAttribute('data-category'));
    });
});

gradientTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        gradientTypeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderSuggestedGradients(null, btn.getAttribute('data-type'));
    });
});

renderSuggestedGradients();

// Contrast Checker
const bgColorInput = document.getElementById('bgColor');
const bgColorText = document.getElementById('bgColorText');
const textColorInput = document.getElementById('textColor');
const textColorText = document.getElementById('textColorText');
const contrastPreview = document.getElementById('contrastPreview');
const contrastRatio = document.getElementById('contrastRatio');
const wcagAA = document.getElementById('wcagAA');
const wcagAAA = document.getElementById('wcagAAA');
const wcagAALarge = document.getElementById('wcagAALarge');
const wcagAAALarge = document.getElementById('wcagAAALarge');
const saveContrastPair = document.getElementById('saveContrastPair');

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1, color2) {
    const lum1 = getLuminance(color1.r, color1.g, color1.b);
    const lum2 = getLuminance(color2.r, color2.g, color2.b);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
}

function updateContrast() {
    const bgColor = hexToRgb(bgColorInput.value);
    const textColor = hexToRgb(textColorInput.value);

    if (bgColor && textColor) {
        const ratio = getContrastRatio(bgColor, textColor);
        contrastRatio.textContent = ratio.toFixed(2) + ':1';

        contrastPreview.style.backgroundColor = bgColorInput.value;
        contrastPreview.style.color = textColorInput.value;

        // Update WCAG compliance
        const aaPass = ratio >= 4.5;
        const aaaPass = ratio >= 7;
        const aaLargePass = ratio >= 3;
        const aaaLargePass = ratio >= 4.5;

        wcagAA.className = `badge ${aaPass ? 'success' : 'error'}`;
        wcagAA.textContent = `WCAG AA: ${aaPass ? 'ناجح' : 'فاشل'}`;

        wcagAAA.className = `badge ${aaaPass ? 'success' : 'error'}`;
        wcagAAA.textContent = `WCAG AAA: ${aaaPass ? 'ناجح' : 'فاشل'}`;

        wcagAALarge.className = `badge ${aaLargePass ? 'success' : 'error'}`;
        wcagAALarge.textContent = `WCAG AA: ${aaLargePass ? 'ناجح' : 'فاشل'}`;

        wcagAAALarge.className = `badge ${aaaLargePass ? 'success' : 'error'}`;
        wcagAAALarge.textContent = `WCAG AAA: ${aaaLargePass ? 'ناجح' : 'فاشل'}`;
    }
}

bgColorInput.addEventListener('input', (e) => {
    bgColorText.value = e.target.value;
    updateContrast();
});

bgColorText.addEventListener('input', (e) => {
    bgColorInput.value = e.target.value;
    updateContrast();
});

textColorInput.addEventListener('input', (e) => {
    textColorText.value = e.target.value;
    updateContrast();
});

textColorText.addEventListener('input', (e) => {
    textColorInput.value = e.target.value;
    updateContrast();
});

saveContrastPair.addEventListener('click', () => {
    const contrastPair = {
        type: 'contrast',
        bgColor: bgColorInput.value,
        textColor: textColorInput.value,
        ratio: parseFloat(contrastRatio.textContent)
    };
    saveToFavorites(contrastPair);
});

// Suggested Contrast Pairs
const suggestedContrastPairs = [
    { bg: '#ffffff', text: '#000000', ratio: 21.0 },
    { bg: '#f8fafc', text: '#1e293b', ratio: 18.5 },
    { bg: '#3b82f6', text: '#ffffff', ratio: 8.6 },
    { bg: '#10b981', text: '#ffffff', ratio: 4.2 },
    { bg: '#f59e0b', text: '#000000', ratio: 3.2 },
    { bg: '#ef4444', text: '#ffffff', ratio: 4.0 }
];

const suggestedContrastContainer = document.getElementById('suggestedContrastPairs');

function renderSuggestedContrastPairs() {
    suggestedContrastContainer.innerHTML = '';

    suggestedContrastPairs.forEach(pair => {
        const pairDiv = document.createElement('div');
        pairDiv.className = 'contrast-pair';

        const colorsDiv = document.createElement('div');
        colorsDiv.className = 'contrast-pair-colors';

        const bgDiv = document.createElement('div');
        bgDiv.className = 'contrast-pair-bg';
        bgDiv.style.backgroundColor = pair.bg;

        const textDiv = document.createElement('div');
        textDiv.className = 'contrast-pair-text';
        textDiv.style.backgroundColor = pair.text;
        textDiv.textContent = 'نص';

        colorsDiv.appendChild(bgDiv);
        colorsDiv.appendChild(textDiv);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'contrast-pair-info';

        const ratioDiv = document.createElement('div');
        ratioDiv.className = 'contrast-pair-ratio';
        ratioDiv.textContent = `${pair.ratio}:1`;

        const saveBtn = document.createElement('button');
        saveBtn.className = 'save-btn';
        saveBtn.innerHTML = '<i class="fas fa-heart"></i>';
        saveBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const contrastData = {
                type: 'contrast',
                bgColor: pair.bg,
                textColor: pair.text,
                ratio: pair.ratio
            };
            saveToFavorites(contrastData);
        });

        infoDiv.appendChild(ratioDiv);
        infoDiv.appendChild(saveBtn);

        pairDiv.appendChild(colorsDiv);
        pairDiv.appendChild(infoDiv);

        pairDiv.addEventListener('click', () => {
            bgColorInput.value = pair.bg;
            bgColorText.value = pair.bg;
            textColorInput.value = pair.text;
            textColorText.value = pair.text;
            updateContrast();
        });

        suggestedContrastContainer.appendChild(pairDiv);
    });
}

renderSuggestedContrastPairs();

// Color Converter
const converterColor = document.getElementById('converterColor');
const converterType = document.getElementById('converterType');
const converterInput = document.getElementById('converterInput');
const converterPreview = document.getElementById('converterPreview');
const hexOutput = document.getElementById('hexOutput');
const rgbOutput = document.getElementById('rgbOutput');
const hslOutput = document.getElementById('hslOutput');
const hsvOutput = document.getElementById('hsvOutput');
const cmykOutput = document.getElementById('cmykOutput');
const cssVarOutput = document.getElementById('cssVarOutput');
const harmoniesContainer = document.getElementById('harmoniesContainer');
const saveConverterColor = document.getElementById('saveConverterColor');

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0;
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

function rgbToCmyk(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const k = 1 - Math.max(r, g, b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;

    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
}

function updateConverter() {
    const color = converterColor.value;
    const rgb = hexToRgb(color);

    if (rgb) {
        converterPreview.style.backgroundColor = color;

        hexOutput.value = color.toUpperCase();
        rgbOutput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        hslOutput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        hsvOutput.value = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;

        const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
        cmykOutput.value = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

        cssVarOutput.value = `--primary-color: ${color};`;

        renderColorHarmonies(color);
    }
}

function renderColorHarmonies(baseColor) {
    const harmonies = [
        { name: 'أصلي', color: baseColor },
        { name: 'مكمل', color: getComplementaryColor(baseColor) },
        { name: 'مثلثي', color: getTriadicColor(baseColor, 120) },
        { name: 'مثلثي 2', color: getTriadicColor(baseColor, 240) },
        { name: 'رباعي', color: getTetradicColor(baseColor, 90) },
        { name: 'رباعي 2', color: getTetradicColor(baseColor, 180) },
        { name: 'رباعي 3', color: getTetradicColor(baseColor, 270) },
        { name: 'أحادي', color: getAnalogousColor(baseColor, 30) }
    ];

    harmoniesContainer.innerHTML = '';

    harmonies.forEach(harmony => {
        const harmonyDiv = document.createElement('div');
        harmonyDiv.className = 'harmony-color';
        harmonyDiv.style.backgroundColor = harmony.color;
        harmonyDiv.addEventListener('click', () => {
            converterColor.value = harmony.color;
            updateConverter();
        });

        const infoDiv = document.createElement('div');
        infoDiv.className = 'harmony-info';
        infoDiv.textContent = harmony.name;

        harmonyDiv.appendChild(infoDiv);
        harmoniesContainer.appendChild(harmonyDiv);
    });
}

function getComplementaryColor(color) {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.h = (hsl.h + 180) % 360;
    return hslToHex(hsl.h, hsl.s, hsl.l);
}

function getTriadicColor(color, angle) {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.h = (hsl.h + angle) % 360;
    return hslToHex(hsl.h, hsl.s, hsl.l);
}

function getTetradicColor(color, angle) {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.h = (hsl.h + angle) % 360;
    return hslToHex(hsl.h, hsl.s, hsl.l);
}

function getAnalogousColor(color, angle) {
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    hsl.h = (hsl.h + angle) % 360;
    return hslToHex(hsl.h, hsl.s, hsl.l);
}

function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = c => {
        const hex = Math.round(c * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

converterColor.addEventListener('input', updateConverter);
converterInput.addEventListener('input', (e) => {
    converterColor.value = e.target.value;
    updateConverter();
});

converterType.addEventListener('change', () => {
    // Update input placeholder based on type
    const type = converterType.value;
    switch(type) {
        case 'hex':
            converterInput.placeholder = '#3B82F6';
            break;
        case 'rgb':
            converterInput.placeholder = 'rgb(59, 130, 246)';
            break;
        case 'hsl':
            converterInput.placeholder = 'hsl(217, 91%, 60%)';
            break;
        case 'hsv':
            converterInput.placeholder = 'hsv(217, 76%, 96%)';
            break;
        case 'cmyk':
            converterInput.placeholder = 'cmyk(76%, 47%, 0%, 4%)';
            break;
    }
});

// Copy buttons
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-clipboard-target');
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            copyToClipboard(targetElement.value);
        }
    });
});

saveConverterColor.addEventListener('click', () => {
    const color = {
        type: 'color',
        hex: hexOutput.value,
        rgb: rgbOutput.value,
        hsl: hslOutput.value,
        hsv: hsvOutput.value,
        cmyk: cmykOutput.value
    };
    saveToFavorites(color);
});

// Favorites System
let favorites = JSON.parse(localStorage.getItem('colorMateFavorites')) || {
    colors: [],
    palettes: [],
    gradients: [],
    contrast: []
};

const emptyFavorites = document.getElementById('emptyFavorites');
const favoritesContainer = document.getElementById('favoritesContainer');
const favoriteColors = document.getElementById('favoriteColors');
const favoritePalettes = document.getElementById('favoritePalettes');
const favoriteGradients = document.getElementById('favoriteGradients');
const favoriteContrastPairs = document.getElementById('favoriteContrastPairs');

function saveToFavorites(item) {
    switch(item.type) {
        case 'color':
            favorites.colors.push(item);
            break;
        case 'palette':
            favorites.palettes.push(item);
            break;
        case 'gradient':
            favorites.gradients.push(item);
            break;
        case 'contrast':
            favorites.contrast.push(item);
            break;
    }

    localStorage.setItem('colorMateFavorites', JSON.stringify(favorites));
    renderFavorites();
    showCopiedAlert();
}

function removeFromFavorites(type, index) {
    favorites[type].splice(index, 1);
    localStorage.setItem('colorMateFavorites', JSON.stringify(favorites));
    renderFavorites();
}

function renderFavorites() {
    const hasFavorites = favorites.colors.length > 0 || favorites.palettes.length > 0 ||
                        favorites.gradients.length > 0 || favorites.contrast.length > 0;

    if (hasFavorites) {
        emptyFavorites.classList.add('hidden');
        favoritesContainer.classList.remove('hidden');

        // Render favorite colors
        favoriteColors.innerHTML = '';
        favorites.colors.forEach((color, index) => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color-item';
            colorDiv.style.backgroundColor = color.hex;
            colorDiv.addEventListener('click', () => copyToClipboard(color.hex));

            const infoDiv = document.createElement('div');
            infoDiv.className = 'color-info';
            infoDiv.textContent = color.hex;

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-favorite';
            removeBtn.innerHTML = '×';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromFavorites('colors', index);
            });

            colorDiv.appendChild(infoDiv);
            colorDiv.appendChild(removeBtn);
            favoriteColors.appendChild(colorDiv);
        });

        // Render favorite palettes
        favoritePalettes.innerHTML = '';
        favorites.palettes.forEach((palette, index) => {
            const paletteCard = document.createElement('div');
            paletteCard.className = 'palette-card';

            const colorsDiv = document.createElement('div');
            colorsDiv.className = 'palette-colors';

            palette.colors.forEach(color => {
                const colorDiv = document.createElement('div');
                colorDiv.className = 'palette-color';
                colorDiv.style.backgroundColor = color;
                colorsDiv.appendChild(colorDiv);
            });

            const infoDiv = document.createElement('div');
            infoDiv.className = 'palette-info';

            const nameDiv = document.createElement('div');
            nameDiv.className = 'palette-name';
            nameDiv.textContent = palette.name;

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-favorite';
            removeBtn.innerHTML = '×';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromFavorites('palettes', index);
            });

            infoDiv.appendChild(nameDiv);
            paletteCard.appendChild(colorsDiv);
            paletteCard.appendChild(infoDiv);
            paletteCard.appendChild(removeBtn);

            favoritePalettes.appendChild(paletteCard);
        });

        // Render favorite gradients
        favoriteGradients.innerHTML = '';
        favorites.gradients.forEach((gradient, index) => {
            const gradientCard = document.createElement('div');
            gradientCard.className = 'gradient-card';
            gradientCard.style.background = gradient.css;

            const infoDiv = document.createElement('div');
            infoDiv.className = 'gradient-info';
            infoDiv.textContent = gradient.name || 'تدرج محفوظ';

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-favorite';
            removeBtn.innerHTML = '×';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeFromFavorites('gradients', index);
            });

            gradientCard.appendChild(infoDiv);
            gradientCard.appendChild(removeBtn);
            favoriteGradients.appendChild(gradientCard);
        });

        // Render favorite contrast pairs
        favoriteContrastPairs.innerHTML = '';
        favorites.contrast.forEach((pair, index) => {
            const pairDiv = document.createElement('div');
            pairDiv.className = 'contrast-pair';

            const colorsDiv = document.createElement('div');
            colorsDiv.className = 'contrast-pair-colors';

            const bgDiv = document.createElement('div');
            bgDiv.className = 'contrast-pair-bg';
            bgDiv.style.backgroundColor = pair.bgColor;

            const textDiv = document.createElement('div');
            textDiv.className = 'contrast-pair-text';
            textDiv.style.backgroundColor = pair.textColor;
            textDiv.textContent = 'نص';

            colorsDiv.appendChild(bgDiv);
            colorsDiv.appendChild(textDiv);

            const infoDiv = document.createElement('div');
            infoDiv.className = 'contrast-pair-info';

            const ratioDiv = document.createElement('div');
            ratioDiv.className = 'contrast-pair-ratio';
            ratioDiv.textContent = `${pair.ratio.toFixed(1)}:1`;

            infoDiv.appendChild(ratioDiv);

            pairDiv.appendChild(colorsDiv);
            pairDiv.appendChild(infoDiv);

            favoriteContrastPairs.appendChild(pairDiv);
        });

    } else {
        emptyFavorites.classList.remove('hidden');
        favoritesContainer.classList.add('hidden');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateGradient();
    updateContrast();
    updateConverter();
    renderFavorites();
});