import { useState, useEffect } from 'react';

export function useClientOnly<T>(initialValue: T, clientValue: T): [T, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setValue(clientValue);
  }, [clientValue]);

  return [value, mounted];
}

export function useClientOnlyState<T>(initialValue: T): [T, (value: T) => void, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return [value, setValue, mounted];
}
