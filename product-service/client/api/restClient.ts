async function fetchProps(query: Query): Promise<Props[]> {
    const response = await fetch(`/product-api/search?f=${query.field}&v=${query.value}`);
    const rowArray = await response.json();
    var props: Props[];
    props = [];
    var entry: Props;
    for (const row of rowArray) {
        entry = {
            id: row.id,
            stock: row.stock,
            category: row.category,
            title: row.title,
            price: row.price,
            featured: row.featured,
            imagePath: row.image_path
        }
        props.push(entry)
    }
    return props;
}