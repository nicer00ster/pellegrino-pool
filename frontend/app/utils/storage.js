export function verifyToken(key) {
  if(!key) return null;
  try {
    const value = localStorage.getItem(key);
    if(value) {
      return JSON.parse(value)
    } else {
      return null;
    }
  } catch(err) {
    return null;
  }
};

export function setToken(key, value) {
  if(!key) {
   console.error('Error: Key is missing.');
  }
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch(err) {
    console.error(err);
  }
};
