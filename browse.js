const browseTabButton = document.querySelector('[data-tab="browse"]');
const browseSection = document.getElementById('tab-browse');
const browseCount = document.getElementById('browse-count');
const browseList = document.getElementById('browse-list');


function fixYear(year){
    if (year > 1300){
        return year;
    }else if (year < 50){
        return year += 1400;
    }
    else {
        return year += 1300;
    }
}

// One entry per filter: the input's id and the rule it applies
const filters = [
    {
        id: 'type-browser',
        rule: (property, value) => property.type === value
    },
    {
        id: 'view-browser',
        rule: (property, value) => property.view === value
    },
    {
        id: 'min-size-browser',
        rule: (property, value) => property.size >= toNumber(value)
    },
    {
        id: 'max-size-browser',
        rule: (property, value) => property.size <= toNumber(value)
    },
    {
        id: 'year-browser',
        rule: (property, value) => fixYear(property.year) >= fixYear(toNumber(value))
    },
    {
        id: 'rooms-browser',
        rule: (property, value) => property.rooms === toNumber(value)
    },
    {
        id: 'floor-browser',
        rule: (property, value) => property.floor === toNumber(value)
    },
    {
        id: 'min-sell-price-browser',
        rule: (property, value) => property.sellPrice >= toNumber(value)
    },
    {
        id: 'max-sell-price-browser',
        rule: (property, value) => property.sellPrice <= toNumber(value)
    },
    {
        id: 'min-rent-price-browser',
        rule: (property, value) => property.rentPrice >= toNumber(value)
    },
    {
        id: 'max-rent-price-browser',
        rule: (property, value) => property.rentPrice <= toNumber(value)
    },
    {
        id: 'desc-browser',
        rule: (property, value) =>
            normalizeText(property.description).includes(normalizeText(value))
    },
    {
        id: 'owner-name-browser',
        rule: (property, value) => property.ownerName === value
    },
    {
        id: 'owner-phone-browser',
        rule: (property, value) => property.ownerPhone === value
    }
    
];

function matchesFilters(property) {
    return filters.every(filter => {
        const value = document.getElementById(filter.id).value.trim();
        if (value === '') return true;
        return filter.rule(property, value);
    });
}

function formatPrice(price) {
    return price > 0 ? price.toLocaleString() : 'Not offered';
}

function createRow(label, value) {
    const row = document.createElement('p');
    row.textContent = `${label}: ${value}`;
    return row;
}

function createPropertyCard(property) {
    const card = document.createElement('article');
    card.dataset.id = property.id;

    const title = document.createElement('h3');
    title.textContent = property.type;
    card.appendChild(title);

    card.appendChild(createRow('Size', `${property.size} m²`));
    card.appendChild(createRow('Year built', property.year));
    card.appendChild(createRow('Rooms', property.rooms));
    card.appendChild(createRow('Floor', property.floor));
    if (property.unitNumber) {
        card.appendChild(createRow('Unit', property.unitNumber));
    }
    card.appendChild(createRow('Sell price', formatPrice(property.sellPrice)));
    card.appendChild(createRow('Rent price', formatPrice(property.rentPrice)));
    card.appendChild(createRow('Owner', `${property.ownerName} --- number: ${property.ownerPhone}`));
    card.appendChild(createRow('Description', property.description));

    return card;
}

function renderBrowse() {
    const properties = database.properties.filter(matchesFilters);

    browseList.innerHTML = '';
    browseCount.textContent = `${properties.length} of ${database.properties.length} properties`;

    properties.forEach(property => {
        browseList.appendChild(createPropertyCard(property));
    });
}

browseTabButton.addEventListener('click', renderBrowse);
browseSection.addEventListener('input', renderBrowse);