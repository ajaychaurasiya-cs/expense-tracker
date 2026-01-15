import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

interface HisType {
  okEdit: boolean;
  editEnable: boolean;
  deleteId: boolean;
  editHistory: object | null;
  useItemId: string | null;

  setOkEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditEnable: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteId: React.Dispatch<React.SetStateAction<boolean>>;
  setEditHistory: React.Dispatch<React.SetStateAction<object | null>>;
  setUseItemId: React.Dispatch<React.SetStateAction<string | null>>;
}

const HistoryContext = createContext<HisType | null>(null);

export const HistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [okEdit, setOkEdit] = useState<boolean>(false);
  const [editEnable, setEditEnable] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<boolean>(false);
  const [editHistory, setEditHistory] = useState<object | null>(null);
  const [useItemId, setUseItemId] = useState<string | null>(null);

 
// delete item useEffect
  const deleteItem = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); // ✅ await

    if (!token) {
      console.log("No token found");
      return;
    }

    await axios.delete(
      `http://10.0.2.2:5000/api/transactions/${useItemId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    setDeleteId(false);
    setUseItemId(null);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    deleteId && deleteItem();
  }, [deleteId]);




// edit item useEffect
 
    const editItem = async () => {
    try {
    const token = await AsyncStorage.getItem('token'); // ✅ await

    if (!token) {
      console.log("No token found");
      return;
    }

    if(editHistory){
    await axios.put(
      `http://10.0.2.2:5000/api/transactions/${useItemId}`,
      editHistory,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );}

    setOkEdit(false);
    setEditEnable(false);
    setUseItemId(null);
    setEditHistory(null);
  } catch (error) {
    console.log(error);
  }};

  useEffect(() => {
    okEdit && editItem();
   }, [okEdit]);




  return (
    <HistoryContext.Provider
      value={{
        okEdit,
        editHistory,
        deleteId,
        useItemId,
        editEnable,

        setOkEdit,
        setEditHistory,
        setDeleteId,
        setUseItemId,
        setEditEnable,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within HistoryProvider');
  }
  return context;
};
