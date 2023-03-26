import React, {useState} from 'react';

import TabPanel, { ITabPanelOptions } from 'devextreme-react/tab-panel';

import { dxTabPanelOptions } from 'devextreme/ui/tab_panel';
import './styles.css'

export type TabCompProps = {
    defaultTabIndex: number;
    customTabTitle:  ITabPanelOptions['itemTitleRender'];
    customeTabContent: ITabPanelOptions['itemRender'];
    onTabChange: (currentTabIndex: number) => void
} & ITabPanelOptions & dxTabPanelOptions


const TabComp: React.FunctionComponent<TabCompProps> = ({
    dataSource,
    defaultTabIndex, 
    customTabTitle, 
    customeTabContent,
    onTabChange,
    ...props
   }) => {
    const [selectedIndex, setSelectedIndex] = useState(defaultTabIndex);
    const onSelectionChanged = (args: any) => {
        if (args.name === 'selectedIndex') {
            onTabChange && onTabChange(args.value);
            setSelectedIndex(args.value);
        }
      }
    return (
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

export default TabComp;
