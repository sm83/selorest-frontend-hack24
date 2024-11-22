type TLocalStorage = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
};

export const useLocalStorage = () => {
  const setData = (dataObjName: string, data: TLocalStorage) => {
    try {
      localStorage.setItem(dataObjName, JSON.stringify(data.value));
    } catch (error) {
      console.error('Error setting localStorage', error);
    }
  };

  const getData = (name: string) => {
    try {
      const item = localStorage.getItem(name);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error getting localStorage', error);
      return null;
    }
  };

  const deleteData = (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch (error) {
      console.error('Error deleting localStorage', error);
    }
  };

  const updateData = (data: TLocalStorage) => {
    try {
      const currentValue = localStorage.getItem(data.name);
      if (currentValue) {
        const parsedValue = JSON.parse(currentValue);
        const updatedValue = { ...parsedValue, ...data.value };
        localStorage.setItem(data.name, JSON.stringify(updatedValue));
      }
    } catch (error) {
      console.error('Error updating localStorage', error);
    }
  };

  return {
    setData,
    getData,
    deleteData,
    updateData,
  };
};
