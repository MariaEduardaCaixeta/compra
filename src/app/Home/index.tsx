import { View, Image } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function Home() {

  const handleAdd = () => {
    console.log('Adicionar button pressed');
  }
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <Input placeholder="O que você precisa comprar?" />
      <Button title="Adicionar" onPress={handleAdd}/>
    </View>
  );
}


