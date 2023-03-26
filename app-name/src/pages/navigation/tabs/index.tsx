import React from 'react';
import { multiViewItems as companies } from './data';

import TabComp from './TabsComp';

const itemTitleRender = (company: any) => {
    return <span>{company.CompanyName}</span>;
}

const tabItem = (company: any) => (
    <div>
        <div className="tabpanel-item">
            <div>
                <p>
                    <b>{company.City} </b>
                    (<span>{company.State}</span>)
                </p>
                <p>
                    <span>{company.Zipcode} </span>
                    <span>{company.Address}</span>
                </p>
            </div>
            <div>
                <p>
                    Phone: <b>{company.Phone}</b>
                </p>
                <p>
                    Fax: <b>{company.Fax}</b>
                </p>
                <p>
                    Website: <a
                        href={company.Website}
                        target="_blank" rel="noreferrer">
                        {company.Website}
                    </a>
                </p>
            </div>
        </div>
    </div>
);

const TabsCompImpl = () => (
    <TabComp
        defaultTabIndex={0}
        dataSource={companies}
        customTabTitle={itemTitleRender}
        customeTabContent={tabItem}
        onTabChange={(selectedIndex) => console.log(selectedIndex)}
        loop={false}
        animationEnabled={true}
        swipeEnabled={true}
    />
)

export default TabsCompImpl;