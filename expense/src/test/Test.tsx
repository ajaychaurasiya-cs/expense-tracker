import { useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';

type itemType = {
  id: string;
  grocery: string;
}

function Test() {
  const [item, setitem] = useState<itemType[]>([{id:"1",grocery:"hello"}]);
  const [value, setValue] = useState<string>('');
  const [status, setStatus] = useState<boolean>(false);

  const handleAddStatus = () => {
    const id = new Date().toISOString();
    const data = {id:id,grocery:value};
    setitem([...item, data]);
    setStatus(true);
    setValue('');
  };

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={text => setValue(text)}
        placeholder="Groceries"
      />
      <Button onPress={handleAddStatus} title='Done'/>
      <FlatList
        data={item}
        keyExtractor={(item) => item.id}
        renderItem={({item})=>(
          <View >
            <Text>{item.grocery}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default Test;
