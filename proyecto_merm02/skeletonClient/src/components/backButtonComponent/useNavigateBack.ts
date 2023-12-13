import { useNavigate } from 'react-router-dom';

export function useNavigateBack() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  return goBack;
}
