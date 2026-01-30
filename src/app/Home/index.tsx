import { View, Image, Pressable, Text, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/Item';
import { useEffect, useState } from 'react';
import { ItemStorage, itemsStorage } from '@/storage/itemsStorage';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.COMPLETED];

export default function Home() {
  const [activatedStatus, setActivatedStatus] = useState(FilterStatus.PENDING);
  const [newItemDescription, setNewItemDescription] = useState('');
  const [items, setItems] = useState<ItemStorage[]>([]);

  const handleAdd = () => {
    if (!newItemDescription.trim()) {
      return Alert.alert('Descrição vazia', 'Por favor, insira uma descrição para o item.');
    }

    const newItem: ItemStorage = {
      id: Math.random().toString(36).substring(2),
      description: newItemDescription,
      status: FilterStatus.PENDING,
    }

    itemsStorage
      .add(newItem)
      .then((items) => {
        setNewItemDescription('');
        setItems(items);
        setActivatedStatus(FilterStatus.PENDING);
        Alert.alert("Adicionado", `Item "${newItem.description}" adicionado com sucesso!`);
      })
      .catch((error) => {
        console.log('Error saving item:', error);
        Alert.alert('Erro', 'Não foi possível adicionar o item.');
      });
  }

  const handleRemove = (itemId: string) => {
    itemsStorage
      .remove(itemId)
      .then((items) => {
        setItems(items);
        Alert.alert("Removido", `Item removido com sucesso!`);
      })
      .catch((error) => {
        console.log('Error removing item:', error);
        Alert.alert('Erro', 'Não foi possível remover o item.');
      });
  }

  const handleListStatusChange = () => {
    itemsStorage
      .getByStatus(activatedStatus)
      .then(setItems)
      .catch((error) => {
        console.log('Error fetching items:', error);
        Alert.alert('Erro', 'Não foi possível carregar os itens.');
      });
  }

  const handleItemStatusChange = (id: string) => {
    itemsStorage
      .toggleItemStaus(id)
      .then((items) => {
        setItems(items.filter(item => item.status === activatedStatus));
      })
      .catch((error) => {
        console.log('Error toggling item status:', error);
        Alert.alert('Erro', 'Não foi possível atualizar o status do item.');
      });
  }

  const handleClearItems = () => {
    Alert.alert("Limpar", "Tem certeza que deseja limpar todos os itens?", [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: () => {
          itemsStorage
            .clear()
            .then(() => {
              setItems([]);
              Alert.alert("Limpo", "Todos os itens foram removidos com sucesso!");
            })
            .catch((error) => {
              console.log('Error clearing items:', error);
              Alert.alert('Erro', 'Não foi possível limpar os itens.');
            });
        }
      }
    ]);
  }

  // Opção 2
  async function getItems() {
    try {
      const fetchedItems = await itemsStorage.getByStatus(activatedStatus);
      setItems(fetchedItems);
    } catch (error) {
      console.log('Error fetching items:', error);
      Alert.alert('Erro', 'Não foi possível carregar os itens.');
    }
  }

  // Opção 1
  useEffect(() => {
    handleListStatusChange();
  }, [activatedStatus]);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?"
          value={newItemDescription}
          onChangeText={setNewItemDescription}
        />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.filters}>
          {
            FILTER_STATUS.map(status => (
              <Filter
                key={status}
                status={status}
                isActive={activatedStatus === status}
                onPress={() => setActivatedStatus(status)}
              />
            ))
          }

          <Pressable style={styles.clearButton} onPress={handleClearItems}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </Pressable>
        </View>

        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => handleRemove(item.id)}
              onStatusChange={() => handleItemStatusChange(item.id)}
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


