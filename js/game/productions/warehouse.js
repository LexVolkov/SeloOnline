const Warehouse = {}
Warehouse.GetProductName = function(product) {
    for (var key in PRODUCTIONS) {
        if (PRODUCTIONS[key] === product) {
            return key;
        }
    }
    return null; // Если продукт не найден
}
Warehouse.GetProductFromName = function(product_name) {
    for (var key in PRODUCTIONS) {
        if (key === product_name) {
            return PRODUCTIONS[key];
        }
    }
    return null; // Если продукт не найден
}