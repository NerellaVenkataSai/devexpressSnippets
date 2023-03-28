import React, { useState } from 'react';
import { Sortable } from 'devextreme-react/sortable';
import TabPanel, { ITabPanelOptions } from 'devextreme-react/tab-panel';

import { dxTabPanelOptions } from 'devextreme/ui/tab_panel';
import './styles.css'
import { DataSourceLike } from 'devextreme/data/data_source';

export type TabCompProps = {
    defaultTabIndex: number;
    customTabTitle: ITabPanelOptions['itemTitleRender'];
    customeTabContent: ITabPanelOptions['itemRender'];
    onTabChange: (currentTabIndex: number) => void;
    interactiveTabs?: boolean;
} & ITabPanelOptions & dxTabPanelOptions


const TabComp: React.FunctionComponent<TabCompProps> = ({
    dataSource: data,
    defaultTabIndex,
    customTabTitle,
    customeTabContent,
    onTabChange,
    interactiveTabs,
    ...props
}) => {
    const [dataSource, setDataSource] = useState(data || [])
    const [selectedIndex, setSelectedIndex] = useState(defaultTabIndex);
    const onSelectionChanged = (args: any) => {
        if (args.name === 'selectedIndex') {
            onTabChange && onTabChange(args.value);
            setSelectedIndex(args.value);
        }
    }

    /**
     * Interactive Tabs Events ----------------
     */
    const onTabDragStart = React.useCallback((e: any) => {
        e.itemData = e.fromData[e.fromIndex];
    }, []);

    const onTabDrop = React.useCallback((e: any) => {
        const newEmployees = [...dataSource as any];

        newEmployees.splice(e.fromIndex, 1);
        newEmployees.splice(e.toIndex, 0, e.itemData);

        setDataSource(newEmployees);
    }, [dataSource, setDataSource]);

    const closeButtonHandler = React.useCallback((item: any) => {
        const newEmployees = [...dataSource as any];
        const index = newEmployees.indexOf(item);

        newEmployees.splice(index, 1);
        setDataSource(newEmployees);

        if (index >= newEmployees.length && index > 0) {
            setSelectedIndex(newEmployees[index - 1]);
        }
    }, [dataSource, setDataSource, setSelectedIndex]);

    const renderTitle = React.useCallback((data: any) => (
        <React.Fragment>
            <div style={{display: 'flex'}}>
                <div>
                    {data.CompanyName}
                </div>
                <div>{(dataSource as any).length >= 2 && <i className="dx-icon dx-icon-close" onClick={() => { closeButtonHandler(data); }} />}</div>
            </div>
        </React.Fragment>
    ), [dataSource, closeButtonHandler]);

    /**
     * Interactive Tabs Events ----------------
     */

    return (
        <>
            {
                interactiveTabs ? (
                    <Sortable
                        filter=".dx-tab"
                        data={dataSource || []}
                        itemOrientation="horizontal"
                        dragDirection="horizontal"
                        onDragStart={onTabDragStart}
                        onReorder={onTabDrop}
                    >
                        <TabPanel
                            dataSource={dataSource}
                            height={410}
                            itemTitleRender={renderTitle}
                            deferRendering={false}
                            showNavButtons={true}
                            selectedItem={selectedIndex}
                            repaintChangesOnly={true}
                            onSelectionChanged={onSelectionChanged}
                            itemRender={customeTabContent}
                        />
                    </Sortable>
                ) : (
                    <TabPanel
                        height={260}
                        dataSource={dataSource || []}
                        selectedIndex={selectedIndex}
                        onOptionChanged={onSelectionChanged}
                        itemTitleRender={customTabTitle}
                        itemRender={customeTabContent}
                        {...props}
                    />
                )
            }
        </>
    )

}

export default TabComp;
