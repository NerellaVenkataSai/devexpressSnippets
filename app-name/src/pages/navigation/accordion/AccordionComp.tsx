import React, { useState, FunctionComponent } from 'react';
import Accordion, { IAccordionOptions } from 'devextreme-react/accordion';
// import TagBox from 'devextreme-react/tag-box';

import './styles.css'


export type AccordionCompProps = {
    customItem: IAccordionOptions['itemRender'];
    customTitle: IAccordionOptions['itemTitleRender'];
    onSelectionChanged?: (selectedIndex: number) => void; 
    selectedItems?: (items: Number[]) => void;
} & IAccordionOptions;


const AccordionComp: FunctionComponent<AccordionCompProps> = ({
    customItem, 
    customTitle,
    dataSource,
    defaultSelectedItem,
    ...props 
}) => {
    const [selectedItems, setSelectedItems] = useState(defaultSelectedItem || []);

    const selectionChanged = (e: any)  => {
        let newItems = [...selectedItems];
        e.removedItems.forEach((item: any) => {
            const index = newItems.indexOf(item);
            if (index >= 0) {
                newItems.splice(index, 1);
            }
        });
        if (e.addedItems.length) {
            newItems = [...newItems, ...e.addedItems];
        }
        setSelectedItems(newItems)
    }

    // we can remove selected accordion manually
    // const selectedItemsChanged = (e: any) => {
    //     setSelectedItems(e.value)
    // }

    return (
        <div id="accordion">
            <Accordion
                dataSource={dataSource}
                selectedItems={selectedItems}
                onSelectionChanged={selectionChanged}
                itemTitleRender={customTitle}
                itemRender={customItem}
                id="accordion-container"
                {...props}
            />
        </div>
    );
}


export default AccordionComp;