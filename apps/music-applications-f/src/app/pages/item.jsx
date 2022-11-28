import { useNavigate, useParams } from 'react-router-dom';

function ItemPage({ item }) {
  const router = useNavigate();
  const params = useParams();

  return (
    <div>
      {params.id} {params.type}
    </div>
  );
}

export default ItemPage;
