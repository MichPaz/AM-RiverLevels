import React, { useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { Button } from '@material-ui/core'

import NotifyStores from '../stores/feedbackMessage/snack'


function MyApp() {
  const { enqueueSnackbar } = useSnackbar();


  const handleClickVariant = (variant, message) => {
    enqueueSnackbar(message, { variant: variant });
  };

  useEffect(() => {

    async function _onChange() {
      const message = NotifyStores.getMessage()
      handleClickVariant(message.variant, message.message)
    }

    async function startValues() {
      NotifyStores.addChangeListener(_onChange)
    }

    startValues();

    return function cleanup() {
      NotifyStores.removeChangeListener(_onChange)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <React.Fragment>
      <></>
    </React.Fragment>
  );
}

export default function IntegrationNotistack(props) {
  const notistackRef = React.createRef();
  const onClickDismiss = key => () => {
    notistackRef.current.closeSnackbar(key);
  }

  return (
    <SnackbarProvider
      preventDuplicate
      maxSnack={4}
      ref={notistackRef}
      action={(key) => (
        <Button onClick={onClickDismiss(key)} style={{ color: '#fff' }}>
          fechar
        </Button>
      )}
    >
      <MyApp />
      {props.children}
    </SnackbarProvider>
  );
}