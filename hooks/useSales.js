import { useState, useEffect } from 'react';

export const useSales = () => {
  const [leads, setLeads] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      const salesData = {
        leads: [
          { id: 1, name: 'Company A', status: 'Contacted' },
          { id: 2, name: 'Company B', status: 'Proposal Sent' }
        ],
        salesOrders: [
          { id: 101, customer: 'Company A', amount: 5000, status: 'Pending' },
          { id: 102, customer: 'Company B', amount: 12000, status: 'Confirmed' }
        ]
      };
      setLeads(salesData.leads);
      setSalesOrders(salesData.salesOrders);
    };

    fetchSalesData();
  }, []);

  const addLead = (newLead) => {
    setLeads([...leads, { id: leads.length + 1, ...newLead }]);
  };

  const addSalesOrder = (newOrder) => {
    setSalesOrders([...salesOrders, { id: salesOrders.length + 101, ...newOrder }]);
  };

  return { leads, salesOrders, addLead, addSalesOrder };
};
