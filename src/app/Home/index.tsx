import { View, Image, Pressable, Text, FlatList } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/Item';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.COMPLETED];
const ITEMS = [
  { id: '1', status: FilterStatus.PENDING, description: 'Example item 1' },
  { id: '2', status: FilterStatus.COMPLETED, description: 'Example item 2' },
];

export default function Home() {

  const handleAdd = () => {
    console.log('Adicionar button pressed');
  }

  const handleRemove = () => {
    console.log('Remove button pressed');
  }

  const handleStatusChange = () => {
    console.log('Status change button pressed');
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
          {
            FILTER_STATUS.map(status => (
              <Filter key={status} status={status} isActive={status === FilterStatus.PENDING} />
            ))
          }

          <Pressable style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </Pressable>
        </View>

        <FlatList
          data={ITEMS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={handleRemove}
              onStatusChange={handleStatusChange}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => <Text style={styles.emptyText}>Nenhum item aqui</Text>}
        />
      </View>
    </View>
  );
}


