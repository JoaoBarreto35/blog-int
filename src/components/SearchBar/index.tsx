import styles from './styles.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <input
      type='search'
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || 'Pesquisar...'}
      className={styles.searchBar}
    />
  );
}
