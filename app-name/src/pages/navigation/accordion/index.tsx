import React, { useState } from 'react';
import Accordion from 'devextreme-react/accordion';
import CheckBox from 'devextreme-react/check-box';
import TagBox from 'devextreme-react/tag-box';
import Slider, { Tooltip, Label } from 'devextreme-react/slider';
import './styles.css'

import { companies } from './data'

function CustomItem(data:any) {
    return (
        <div>
            <div>
                <p>
                    <b>{data.City} </b>
                    (<span>{data.State}</span>)
                </p>
                <p>
                    <span>{data.Zipcode} </span>
                    <span>{data.Address}</span>
                </p>
            </div>
            <div>
                <p>
                    Phone: <b>{data.Phone}</b>
                </p>
                <p>
                    Fax: <b>{data.Fax}</b>
                </p>
                <p>
                    Website: <a href={data.Website} target="_blank" rel="noreferrer">
                        {data.Website}
                    </a>
                </p>
            </div>
        </div>
    );
}

function CustomTitle(data:any) {
    return (
        <h1>{data.CompanyName}</h1>
    );
}

const AccordionComp = () => {
    const [selectedItems, setSelectedItems] = useState([companies[0]]);
    const [multiple, setMultiple] = useState(false);
    const [collapsible, setCollapsible] = useState(false);
    const [animationDuration, setAnimationDuration] = useState(300);

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

    const selectedItemsChanged = (e: any) => {
        setSelectedItems(e.value)
    }

    const multipleChanged = (e: any) => {
        setMultiple(e.value);
    }

    const collapsibleChanged = (e: any) => {
        setCollapsible(e.value)
    }

    const animationDurationChanged = (e: any) => {
        setAnimationDuration(e.value)
    }

    return (
        <div id="accordion">
            <Accordion
                dataSource={companies}
                collapsible={collapsible}
                multiple={multiple}
                animationDuration={animationDuration}
                selectedItems={selectedItems}
                onSelectionChanged={selectionChanged}
                itemTitleRender={CustomTitle}
                itemRender={CustomItem}
                id="accordion-container"
            />
            <div className="options">
                <div className="caption">Options</div>
                <div className="option">
                    <CheckBox text="Multiple enabled"
                        value={multiple}
                        onValueChanged={multipleChanged}
                    />
                </div>
                <div className="option">
                    <CheckBox
                        text="Collapsible enabled"
                        value={collapsible}
                        onValueChanged={collapsibleChanged}
                    />
                </div>
                <div className="option">
                    <span>Animation duration</span>
                    <Slider
                        min={0}
                        max={1000}
                        value={animationDuration}
                        onValueChanged={animationDurationChanged}
                    >
                        <Tooltip enabled={true} position="bottom" />
                        <Label visible={true} />
                    </Slider>
                </div>
                <div className="option">
                    <span className="caption">Selected Items</span>
                    <TagBox dataSource={companies}
                        displayExpr="CompanyName"
                        value={selectedItems}
                        onValueChanged={selectedItemsChanged}
                        disabled={!multiple}
                    />
                </div>
            </div>
        </div>
    );
}

export default AccordionComp;