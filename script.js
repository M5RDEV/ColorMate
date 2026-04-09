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
        { name: 'Metro Pulse', colors: ['#222831', '#00ADB5', '#EEEEEE', '#FF5722'] },
        { name: 'Studio Edit', colors: ['#2B2E4A', '#E84545', '#903749', '#F6F6F6'] },
        { name: 'Digital Bloom', colors: ['#1F3C88', '#5893D4', '#F7B801', '#F75C03'] },
        { name: 'Nordic Pop', colors: ['#114B5F', '#1A936F', '#F3E9D2', '#C6DABF'] },
        { name: 'Urban Mint', colors: ['#27374D', '#526D82', '#9DB2BF', '#DDE6ED'] },
        { name: 'Signal Boost', colors: ['#0F172A', '#38BDF8', '#F8FAFC', '#F97316'] }
    ],
    pastel: [
        { name: 'Sugar Cloud', colors: ['#F9C5D5', '#FEE1E8', '#CDE7BE', '#A0CED9'] },
        { name: 'Soft Picnic', colors: ['#FFD6A5', '#FDFFB6', '#CAFFBF', '#9BF6FF'] },
        { name: 'Cotton Garden', colors: ['#CDB4DB', '#FFC8DD', '#FFAFCC', '#BDE0FE'] },
        { name: 'Morning Cream', colors: ['#FAEDCD', '#FDEBD0', '#CDEAC0', '#BEE1E6'] },
        { name: 'Candy Mist', colors: ['#F7D6E0', '#F2B5D4', '#D5E8F7', '#C9F2D3'] },
        { name: 'Pastel Porch', colors: ['#E8DFF5', '#FCE1E4', '#FCF4DD', '#DDEDEA'] }
    ],
    neon: [
        { name: 'Cyber Arcade', colors: ['#0B0F1A', '#00F5D4', '#F15BB5', '#FEE440'] },
        { name: 'Laser Pop', colors: ['#16161A', '#7F5AF0', '#2CB67D', '#FF8906'] },
        { name: 'Night Runner', colors: ['#120136', '#F72585', '#4CC9F0', '#B9FBC0'] },
        { name: 'Glow Grid', colors: ['#1A1A2E', '#E94560', '#0F3460', '#F9F871'] },
        { name: 'Neon Splash', colors: ['#151515', '#08D9D6', '#FF2E63', '#F9F871'] },
        { name: 'Club Signal', colors: ['#2D033B', '#C147E9', '#00FFD1', '#FFF56D'] }
    ],
    vintage: [
        { name: 'Old Postcard', colors: ['#6B4F4F', '#C08B5C', '#F0D9B5', '#A26769'] },
        { name: 'Heritage Print', colors: ['#355070', '#6D597A', '#B56576', '#E56B6F'] },
        { name: 'Dusty Vinyl', colors: ['#7F5539', '#B08968', '#DDB892', '#E6CCB2'] },
        { name: 'Retro Kitchen', colors: ['#4F6D7A', '#C0D6DF', '#D9B08C', '#A44A3F'] },
        { name: 'Sepia Bloom', colors: ['#5E503F', '#A9927D', '#DCC5B2', '#EDDFD2'] },
        { name: 'Film Frame', colors: ['#283618', '#606C38', '#DDA15E', '#FEFAE0'] }
    ],
    nature: [
        { name: 'Forest Trail', colors: ['#31572C', '#4F772D', '#90A955', '#ECF39E'] },
        { name: 'Coastal Walk', colors: ['#006D77', '#83C5BE', '#EDF6F9', '#FFDDD2'] },
        { name: 'Wild Meadow', colors: ['#588157', '#A3B18A', '#DAD7CD', '#BC6C25'] },
        { name: 'Mountain Lake', colors: ['#1D3557', '#457B9D', '#A8DADC', '#F1FAEE'] },
        { name: 'Desert Sage', colors: ['#6C584C', '#A98467', '#DDE5B6', '#ADC178'] },
        { name: 'Sunlit Grove', colors: ['#386641', '#6A994E', '#F2E8CF', '#BC4749'] }
    ],
    flat: [
        { name: 'Flat Starter', colors: ['#2D3142', '#4F5D75', '#BFC0C0', '#EF8354'] },
        { name: 'Flat Social', colors: ['#3A506B', '#5BC0BE', '#C5E5E8', '#FF6B6B'] },
        { name: 'Flat Commerce', colors: ['#22577A', '#38A3A5', '#80ED99', '#F9C74F'] },
        { name: 'Flat Editorial', colors: ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C'] },
        { name: 'Flat Portfolio', colors: ['#264653', '#2A9D8F', '#E9C46A', '#E76F51'] },
        { name: 'Flat Energy', colors: ['#355070', '#6D597A', '#E56B6F', '#EAAC8B'] }
    ],
    material: [
        { name: 'Material Spark', colors: ['#1E88E5', '#43A047', '#FDD835', '#E53935'] },
        { name: 'Material Calm', colors: ['#3949AB', '#00897B', '#FBC02D', '#8E24AA'] },
        { name: 'Material Daylight', colors: ['#1976D2', '#26A69A', '#FFB300', '#5E35B1'] },
        { name: 'Material Earth', colors: ['#6D4C41', '#43A047', '#FB8C00', '#29B6F6'] },
        { name: 'Material Contrast', colors: ['#1565C0', '#C62828', '#F9A825', '#00897B'] },
        { name: 'Material Fresh', colors: ['#5E35B1', '#00ACC1', '#7CB342', '#FF7043'] }
    ],
    warm: [
        { name: 'Golden Hour', colors: ['#7C2D12', '#C2410C', '#FB923C', '#FFEDD5'] },
        { name: 'Spice Market', colors: ['#9A3412', '#EA580C', '#F59E0B', '#FEF3C7'] },
        { name: 'Terracotta Sun', colors: ['#8C3B1F', '#D97706', '#F4A261', '#FCECC9'] },
        { name: 'Cozy Candle', colors: ['#7F1D1D', '#B45309', '#F59E0B', '#FFF7ED'] },
        { name: 'Apricot Dust', colors: ['#A44A3F', '#E76F51', '#F4A261', '#F1E3D3'] },
        { name: 'Amber Hearth', colors: ['#78350F', '#D97706', '#FBBF24', '#FEF9C3'] }
    ],
    cool: [
        { name: 'Arctic Studio', colors: ['#0F4C5C', '#2C7DA0', '#A9D6E5', '#EAF4F4'] },
        { name: 'Blue Current', colors: ['#1D3557', '#457B9D', '#A8DADC', '#F1FAEE'] },
        { name: 'Mint Breeze', colors: ['#135D66', '#77B0AA', '#E3FEF7', '#D8EFD3'] },
        { name: 'Winter Tech', colors: ['#1B4965', '#5FA8D3', '#CAE9FF', '#62B6CB'] },
        { name: 'Calm Glacier', colors: ['#22577A', '#38A3A5', '#57CC99', '#C7F9CC'] },
        { name: 'Evening Tide', colors: ['#0B132B', '#1C2541', '#3A506B', '#5BC0BE'] }
    ],
    monochromatic: [
        { name: 'Balanced Neutral', colors: ['#1F2937', '#4B5563', '#D97706', '#F9FAFB'] },
        { name: 'Muted Focus', colors: ['#334155', '#64748B', '#E2E8F0', '#0EA5E9'] },
        { name: 'Soft Contrast', colors: ['#2D3142', '#BFC0C0', '#FFFFFF', '#EF8354'] },
        { name: 'Editor Desk', colors: ['#2B2D42', '#8D99AE', '#EDF2F4', '#D90429'] },
        { name: 'Calm Highlight', colors: ['#374151', '#9CA3AF', '#F3F4F6', '#10B981'] },
        { name: 'Paper Accent', colors: ['#3F3F46', '#A1A1AA', '#FAFAF9', '#F59E0B'] }
    ],
    corporate: [
        { name: 'Boardroom', colors: ['#0F172A', '#1D4ED8', '#E2E8F0', '#F59E0B'] },
        { name: 'Trust Layer', colors: ['#1E3A8A', '#0F766E', '#CBD5E1', '#F8FAFC'] },
        { name: 'Fintech Deck', colors: ['#111827', '#2563EB', '#10B981', '#F9FAFB'] },
        { name: 'Consulting Pro', colors: ['#1F2937', '#6B7280', '#E5E7EB', '#C08420'] },
        { name: 'Startup Kit', colors: ['#0B132B', '#3A506B', '#5BC0BE', '#F5F5F5'] },
        { name: 'Enterprise Soft', colors: ['#12355B', '#00798C', '#EDAE49', '#EFF1F3'] }
    ],
    retro: [
        { name: 'Cassette Pop', colors: ['#355C7D', '#6C5B7B', '#C06C84', '#F8B195'] },
        { name: 'Arcade Sunset', colors: ['#2A2D43', '#E84855', '#F9DC5C', '#3185FC'] },
        { name: 'Funky Poster', colors: ['#0D3B66', '#FAF0CA', '#F4D35E', '#EE964B'] },
        { name: 'Roller Disco', colors: ['#2E294E', '#541388', '#F1E9DA', '#FFD400'] },
        { name: 'Analog Summer', colors: ['#264653', '#E9C46A', '#F4A261', '#E76F51'] },
        { name: 'Tape Delay', colors: ['#3D405B', '#81B29A', '#F2CC8F', '#E07A5F'] }
    ],
    minimal: [
        { name: 'Quiet Page', colors: ['#1C1C1C', '#6B7280', '#E5E7EB', '#FFFFFF'] },
        { name: 'Soft Serif', colors: ['#2F3E46', '#CAD2C5', '#F8F9FA', '#84A98C'] },
        { name: 'Mono Accent', colors: ['#111827', '#374151', '#F3F4F6', '#3B82F6'] },
        { name: 'Sand Note', colors: ['#403D39', '#CCC5B9', '#FFFCF2', '#EB5E28'] },
        { name: 'Canvas Light', colors: ['#2D3142', '#D8E2DC', '#FFFFFF', '#B56576'] },
        { name: 'Architect', colors: ['#202124', '#5F6368', '#F1F3F4', '#8AB4F8'] }
    ],
    vibrant: [
        { name: 'Festival Lights', colors: ['#EF476F', '#FFD166', '#06D6A0', '#118AB2'] },
        { name: 'Fruit Punch', colors: ['#F94144', '#F3722C', '#F9C74F', '#90BE6D'] },
        { name: 'Tropical Pop', colors: ['#F72585', '#7209B7', '#4CC9F0', '#FEE440'] },
        { name: 'Street Art', colors: ['#FF006E', '#FB5607', '#FFBE0B', '#3A86FF'] },
        { name: 'Color Parade', colors: ['#D00000', '#FFBA08', '#3F88C5', '#136F63'] },
        { name: 'Bright Punch', colors: ['#E63946', '#F4A261', '#2A9D8F', '#264653'] }
    ],
    earthy: [
        { name: 'Clay House', colors: ['#6F4E37', '#A47148', '#D8B08C', '#EFE6DD'] },
        { name: 'Olive Path', colors: ['#414833', '#656D4A', '#A4AC86', '#E9EDC9'] },
        { name: 'Canyon Dust', colors: ['#7F5539', '#B08968', '#DDB892', '#EDE0D4'] },
        { name: 'Field Journal', colors: ['#283618', '#606C38', '#DDA15E', '#FEFAE0'] },
        { name: 'Stone & Moss', colors: ['#3A5A40', '#588157', '#A3B18A', '#DAD7CD'] },
        { name: 'Adobe Calm', colors: ['#774936', '#9C6644', '#DDBEA9', '#EDEDE9'] }
    ],
    metallic: [
        { name: 'Gold Editorial', colors: ['#2B2D42', '#8D99AE', '#D4AF37', '#EDF2F4'] },
        { name: 'Silver Wire', colors: ['#1F2933', '#52606D', '#BCCCDC', '#F5F7FA'] },
        { name: 'Copper Luxe', colors: ['#3C2F2F', '#B5651D', '#DDB892', '#F7F3E9'] },
        { name: 'Steel Accent', colors: ['#202A44', '#5C677D', '#BFC9D9', '#E09F3E'] },
        { name: 'Champagne UI', colors: ['#4A4E69', '#9A8C98', '#C9ADA7', '#F2E9E4'] },
        { name: 'Bronze Signal', colors: ['#2D1E2F', '#6E3B3B', '#C08552', '#F1D6BF'] }
    ],
    jewel: [
        { name: 'Ruby Room', colors: ['#7F1D1D', '#B91C1C', '#FDE68A', '#F8FAFC'] },
        { name: 'Sapphire Club', colors: ['#0B1F3A', '#1D4ED8', '#93C5FD', '#F8FAFC'] },
        { name: 'Emerald Hall', colors: ['#064E3B', '#10B981', '#D1FAE5', '#F59E0B'] },
        { name: 'Amethyst Glow', colors: ['#3B0764', '#9333EA', '#E9D5FF', '#FDE68A'] },
        { name: 'Topaz Night', colors: ['#422006', '#D97706', '#FCD34D', '#FFF7ED'] },
        { name: 'Jade Paper', colors: ['#134E4A', '#0F766E', '#CCFBF1', '#F8FAFC'] }
    ],
    'pastel-dark': [
        { name: 'Moody Candy', colors: ['#3D2C8D', '#916BBF', '#C996CC', '#FFEFEF'] },
        { name: 'Night Bakery', colors: ['#402218', '#865439', '#C68B59', '#EED6C4'] },
        { name: 'Twilight Bloom', colors: ['#2E294E', '#541388', '#F1E9DA', '#FFD400'] },
        { name: 'Storm Sorbet', colors: ['#1F4068', '#4C6A92', '#A5B4CB', '#FFE6E6'] },
        { name: 'Dark Meadow', colors: ['#264653', '#2A9D8F', '#E9C46A', '#F4F1DE'] },
        { name: 'Berry Dusk', colors: ['#5C374C', '#A26769', '#D5B9B2', '#F9EAE1'] }
    ],
    'gradient-inspired': [
        { name: 'Aurora Fade', colors: ['#3A0CA3', '#4361EE', '#4CC9F0', '#B5179E'] },
        { name: 'Sunset Sweep', colors: ['#F72585', '#F77F00', '#FCBF49', '#EAE2B7'] },
        { name: 'Ocean Drift', colors: ['#023E8A', '#0077B6', '#48CAE4', '#CAF0F8'] },
        { name: 'Peach Sky', colors: ['#FF6B6B', '#F7B267', '#FCE38A', '#EAFFD0'] },
        { name: 'Velvet Beam', colors: ['#240046', '#5A189A', '#9D4EDD', '#C77DFF'] },
        { name: 'Mint Ray', colors: ['#05668D', '#00A896', '#02C39A', '#F0F3BD'] }
    ],
    seasonal: [
        { name: 'Spring Bloom', colors: ['#FFAFCC', '#CDB4DB', '#BDE0FE', '#A2D2FF'] },
        { name: 'Summer Coast', colors: ['#0277BD', '#00B4D8', '#90E0EF', '#F9C74F'] },
        { name: 'Autumn Market', colors: ['#9C6644', '#D68C45', '#E6B566', '#6B705C'] },
        { name: 'Winter Morning', colors: ['#1D3557', '#457B9D', '#A8DADC', '#F1FAEE'] },
        { name: 'Holiday Cheer', colors: ['#9B2226', '#BB3E03', '#E9D8A6', '#005F73'] },
        { name: 'Ramadan Lantern', colors: ['#14213D', '#FCA311', '#E5E5E5', '#2EC4B6'] }
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
