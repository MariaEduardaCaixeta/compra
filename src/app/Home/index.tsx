import { View, Image } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';

export default function Home() {

  const handleAdd = () => {
    console.log('Adicionar button pressed');
  }
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.filters}>
          <Filter status={FilterStatus.PENDING} isActive />
          <Filter status={FilterStatus.COMPLETED} isActive={false} />
        </View>
      </View>
    </View>
  );
}


