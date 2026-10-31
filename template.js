function createEmptyProperty() {
    return {
        id: Date.now(),
        type: '',
        view: '',
        size: 0,
        year: 0,
        rooms: 0,
        floor: 0,
        unitNumber: '',
        description: '',
        isEmpty: false,
        sellPrice: 0,
        rentPrice: 0,
        ownerName: '',
        ownerPhone: '',
        images: []
    };
}
function createEmptyDatabase() {
    return {
        properties: []
    };
}

function downloadJson(data, fileName) {
    const json = JSON.stringify(data, null, 4);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
}