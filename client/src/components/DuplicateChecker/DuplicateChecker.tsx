import { useCheckDuplicates } from "../../hooks/useCheckDuplicates";

interface DuplicateCheckerProps {
  email: string;
}

const DuplicateChecker = ({ email }: DuplicateCheckerProps) => {
  const { data, error, isLoading } = useCheckDuplicates(email);


  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.duplicates?.length > 0 ? (
        <div>
          <h4>Duplicates Found:</h4>
          {data.duplicates.map((duplicate: any) => (
            <p key={duplicate.id}>
              {duplicate.name} ({duplicate.email})
            </p>
          ))}
        </div>
      ) : (
        !isLoading && <p>No duplicates found.</p>
      )}
    </div>
  );
};

export default DuplicateChecker;
