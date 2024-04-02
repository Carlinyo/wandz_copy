export const getPersistedData = (key): any | null => {
  try {
    const persistedOnboardingForm = localStorage.getItem(key);
    return persistedOnboardingForm ? JSON.parse(persistedOnboardingForm) : null;
  } catch (error) {
    return null;
  }
};

export const persistData = (key, data: any) => localStorage.setItem(key, JSON.stringify(data));

export const clearPersistedData = (key) => localStorage.removeItem(key);

export default {
  persistData,
  getPersistedData,
  clearPersistedData,
};
