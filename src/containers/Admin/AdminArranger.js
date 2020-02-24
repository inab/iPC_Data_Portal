import React, { Component } from 'react';
import ArrangerAdmin from '@arranger/admin-ui/dist';
import axios from 'axios';

// Hooks style: Fn components.

const ArrangerAdminPage = () => (
    <ArrangerAdmin basename="/admin" apiRoot="http://localhost:8080/" fetcher={fetch} />
  )
  
export default ArrangerAdminPage;