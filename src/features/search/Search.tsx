import { useRouter } from 'next/router'

import styles from './Search.module.css'

export interface SearchDefaultValues {
  q?: string;
}

export interface SearchProps {
  path: string; 
  defaultValues?: SearchDefaultValues
}

function Search({ path, defaultValues } : SearchProps) {
  const router = useRouter()

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      q: { value: string };
    };

    router.push(`${path}?q=${target.q.value}`)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} type='text' name='q' defaultValue={defaultValues?.q} />
      <button className={styles.submit} type='submit'>Search</button>
    </form>
  )
}

export default Search;
