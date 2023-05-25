import React, { useEffect, useState } from "react";
import { AutoComplete } from "primereact/autocomplete";

export default function VirtualScrollerDemo({
  data,
  onSelected,
  name,
  haserror,
}) {
  const [items, setitems] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  useEffect(() => {
    const item = data.map((data) => ({
      label: `${data.key} - ${data.title}`,
      value: data.key,
      id: data.id,
    }));
    console.log({ item: item });
    setitems(item);
  }, [data]);
  const searchItems = (event) => {
    let query = event.query;
    let _filteredItems = [];

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.label.toLowerCase().includes(query.toLowerCase())) {
        _filteredItems.push(item);
      }
    }

    setFilteredItems(_filteredItems);
  };

  return (
    <AutoComplete
      placeholder="Select Project"
      value={selectedItem}
      suggestions={filteredItems}
      completeMethod={searchItems}
      virtualScrollerOptions={{ itemSize: 38 }}
      className={"w-7 " + haserror}
      field="label"
      dropdown
      onChange={(e) => {
        setSelectedItem(e.value);
        onSelected(name, e.value);
      }}
    />
  );
}
