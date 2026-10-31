const btnAdd = document.getElementById('btn-add');

const addType = document.getElementById('add-type');
const addView = document.getElementById('add-view');
const addSize = document.getElementById('add-size');
const addYear = document.getElementById('add-year');
const addRooms = document.getElementById('add-rooms');
const addFloor = document.getElementById('add-floor');
const addUnit = document.getElementById('add-unit');
const addDescription = document.getElementById('add-description');
const addEmpty = document.getElementById('add-empty');
const addNotEmpty = document.getElementById('add-not-empty');
const addSellPrice = document.getElementById('add-sell-price');
const addRentPrice = document.getElementById('add-rent-price');
const addOwnerName = document.getElementById('add-owner-name');
const addOwnerPhone = document.getElementById('add-owner-phone');

function readAddForm() {
    const property = createEmptyProperty();
    property.type = addType.value;
    property.view = addView.value;
    property.size = toNumber(addSize.value);
    property.year = toNumber(addYear.value);
    property.rooms = toNumber(addRooms.value);
    property.floor = toNumber(addFloor.value);
    property.unitNumber = normalizeDigits(addUnit.value.trim());
    property.description = addDescription.value.trim();
    property.isEmpty = addEmpty.checked;
    property.sellPrice = toNumber(addSellPrice.value);
    property.rentPrice = toNumber(addRentPrice.value);
    property.ownerName = addOwnerName.value.trim();
    property.ownerPhone = normalizeDigits(addOwnerPhone.value.trim());
    return property;
}

function clearAddForm() {
    addType.selectedIndex = 0;
    addView.selectedIndex = 0;
    addSize.value = '';
    addYear.value = '';
    addRooms.value = '';
    addFloor.value = '';
    addUnit.value = '';
    addDescription.value = '';
    addNotEmpty.checked = true;
    addSellPrice.value = '';
    addRentPrice.value = '';
    addOwnerName.value = '';
    addOwnerPhone.value = '';
}

function validateProperty(property) {
    if (property.size <= 0) return 'Size must be greater than 0';
    return '';
}

btnAdd.addEventListener('click', () => {
    const property = readAddForm();

    const error = validateProperty(property);
    if (error) {
        setStatus(error);
        return;
    }

    database.properties.push(property);
    cacheDatabase();
    clearAddForm();
    console.log('Added:', property);
    setStatus(`Added property, ${database.properties.length} total (unsaved)`);
});