import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0D2D8',
    alignItems: 'center',    
    
  },
  logo: {
    height: 34,
    width: 134,
    marginTop: 62,
    marginBottom: 42
  },
  form: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 8
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 27,
    borderTopLeftRadius: 27,
    marginTop: 24,
    paddingVertical: 32,
    paddingHorizontal: 24
  },
  filters: {
    flexDirection: 'row',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E6EC',
    paddingBottom: 12
  },
  clearButton: {
    marginLeft: 'auto'
  },
  clearButtonText: {
    color: '#828282',
    fontSize: 12,
    fontWeight: '600'
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#EEF0F5',
  },
  emptyText: {
    textAlign: 'center',
    color: '#808080',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 32
  }
});