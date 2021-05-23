import { FC, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileToUpload } from './EditDrawer';

const Dropzone: FC<{
  reset: boolean;
  files: FileToUpload[];
  setFiles: React.Dispatch<React.SetStateAction<FileToUpload[]>>;
}> = ({ reset, files, setFiles }) => {
  useEffect(() => {
    if (reset) {
      setFiles([]);
    }
  }, [reset]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div
      style={{
        flex: '1',
        border: '1px solid black',
        position: 'relative',
        cursor: 'pointer',
      }}
      {...getRootProps()}
    >
      {files.map((file: FileToUpload) => {
        return (
          <img
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            src={file.preview}
          />
        );
      })}
      <input {...getInputProps()} />
      <p
        style={{
          position: 'absolute',
          bottom: '0',
          width: '100%',
          background: 'black',
          color: 'white',
          padding: '20px',
          fontSize: '12px',
        }}
      >
        Updated
      </p>
    </div>
  );
};

export default Dropzone;
