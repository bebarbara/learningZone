import { Box } from '@material-ui/system';
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useParams, useLocation } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import arrowIosBackOutline from '@iconify/icons-eva/arrow-ios-back-outline';

// Ref: https://gist.github.com/muZk/e11931b3df6aab7c7dd6dd53058c3e41
export default function PaymentRegistration() {
  const { resource, resourceId, paymentStatus } = useParams();
  /* eslint-disable camelcase */
  const { payment_id, status, external_reference, comerciante_order_id } = useLocation().search;
  const paymentId = payment_id;
  const externalReference = external_reference;
  const comercianteOrderId = comerciante_order_id;
  /* eslint-enable camelcase */
  const [dataResponse, setDataResponse] = useState([]);
  const redirectionPath = resource === 'assignments' ? 'tests' : 'events';
  const localUrl = 'http://localhost:3001';
  const prodUrl = 'https://learning-zone-poc.herokuapp.com';

  useEffect(() => {
    handleUpdatePayment();
  }, []);

  const handleUpdatePayment = () => {
    console.log('Updatting payment');
    const data = {
      payment: {
        paymentId,
        externalReference,
        comercianteOrderId
      }
    };
    if (resource === 'assignments') {
      data.assignment = {
        paymentAccepted: paymentStatus === 'success'
      };
    } else {
      data.attendance = {
        paymentAccepted: paymentStatus === 'success'
      };
    }
    const url = `${prodUrl}/api/v1/${resource}/${resourceId}`;
    const params = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch(url, params)
      .then((response) => response.json())
      .then((json) => {
        console.log(`Updated resource ${resource}`, json);
        if (json.data) {
          setDataResponse(json.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <Box>
      {dataResponse && 'Tu pago se ha procesado'}
      {!dataResponse && 'Hubo un problema con tu compra'}
      <Button
        variant="contained"
        component={RouterLink}
        to={`/homeschooling/${redirectionPath}`}
        startIcon={<Icon icon={arrowIosBackOutline} />}
      >
        Volver
      </Button>
    </Box>
  );
}
