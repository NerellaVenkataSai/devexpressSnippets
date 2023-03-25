import React from 'react';
import AccordionComp from './AccordionComp'
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


const AccordionCompImpl = () => (
    <AccordionComp 
      dataSource={companies}
      customItem={CustomItem}
      customTitle={CustomTitle}
      defaultSelectedItem={[companies[0]]}
      multiple={true}
      collapsible={true}
      animationDuration={300}
    />
)

export default AccordionCompImpl;