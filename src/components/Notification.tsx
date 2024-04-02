import React, {useEffect, useState} from 'react'
import { 
  CheckCircleIcon, 
  InformationCircleIcon, 
  XCircleIcon, 
} from '@heroicons/react/outline'
import useNotificationStore from 'stores/useNotificationStore'
import { useConnection } from '@solana/wallet-adapter-react'
import { NetworkConfigurationContext, useNetworkConfiguration } from 'contexts/NetworkConfigurationProvider'

const NotificationList = () => {
  const {notifications, set: setNotificationStore} = useNotificationStore(
    (state) => state
  );
  
  const reversedNotifications = [...notifications].reverse();
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 space-y-2 z-50">
      <div className="space-y-2">
      {
        reversedNotifications.map((n, idx) => (
          <Notification 
            key={`${n.message}${idx}`}
            type={n.type}
            message={n.message}
            description={n.description}
            txid={n.txid}
            onHide={() => {
              setNotificationStore((state: any) => {
                const reversedIndex = reversedNotifications.length - 1 - idx;
                state.notifications = [
                  ...notifications.slice(0, reversedIndex), 
                  ...notifications.slice(reversedIndex + 1),
                ];
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}

const Notification = ({type, message, description, txid, onHide}: any) => {
  const connection = useConnection();
  const {networkConfiguration} = useNetworkConfiguration();
  
  useEffect(() => {
    const id = setTimeout(() => {
      onHide();
    }, 8000);
  
    // Return a cleanup function from the effect
    return () => {
      clearTimeout(id);
    };
  }, [onHide]);

  return (
    <div className="border-l-4 p-4 shadow-md rounded-md" 
    style={{ borderColor: type === 'error' ? '#F87171' : type === 'success' ? '#34D399' : '#60A5FA' }}>
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-2">
          <div>
            {
              type === 'success' ? (
                <CheckCircleIcon />
              ): null}
            {
              type === 'info' ? (
                <InformationCircleIcon />
              ): null}
            {
              type === 'error' ? (
                <XCircleIcon />
              ): null}
            <div>
              <div>
                {message}
              </div>
              {
                description ? (
                  <div>
                    {description}
                  </div>
                ): null
              }
              {
                txid ? (
                  <div>
                    <a href={`https://explorer.solana.com/tx/` + txid +`?cluster=${networkConfiguration}`} target="_blank" rel="noopener noreferrer">
                      <div>
                        {txid.slice(0, 8)}... 
                        {txid.slice(txid.length - 8)}
                      </div>
                    </a>
                  </div>
                ): null}
            </div>
            <div>
              <button onClick={() => onHide}>
                Hide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default NotificationList