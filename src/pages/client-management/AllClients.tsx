import React, { useRef, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TableContainer,
  Paper,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useClients, Client } from '../../context/ClientsContext';
import axios from 'axios';

const ClientsList: React.FC = () => {
  const { clients, updateClient, setClients } = useClients();
  const navigate = useNavigate();
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  // Drag to scroll
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Editing state for single row - stores client ID or null
  const [editingClientId, setEditingClientId] = useState<string | number | null>(null);
  // Local copy of client being edited
  const [editedClient, setEditedClient] = useState<Partial<Client>>({});

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setStartY(e.pageY - containerRef.current.offsetTop);
    setScrollLeft(containerRef.current.scrollLeft);
    setScrollTop(containerRef.current.scrollTop);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const y = e.pageY - containerRef.current.offsetTop;
    const walkX = (x - startX) * 1; // horizontal speed multiplier
    const walkY = (y - startY) * 1; // vertical speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walkX;
    containerRef.current.scrollTop = scrollTop - walkY;
  };
  // Start editing whole row
  const handleEditRow = (client: Client) => {
    setEditingClientId(client._id);
    setEditedClient({ ...client }); // create a copy for editing
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingClientId(null);
    setEditedClient({});
  };

  // Save whole row
  const handleSaveRow = async () => {
    if (editingClientId === null) return;
    await updateClient(editingClientId, editedClient);
    setEditingClientId(null);
    setEditedClient({});
  };

  const handleDeleteClient = async (id: string | number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this client?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/clients/${id}`);
      setClients((prevClients) => prevClients.filter((client) => client._id !== id));
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Failed to delete the client. Please try again.');
    }
  };

  const fields: { key: keyof Client; label: string; align?: 'left' | 'center' }[] = [
    { key: 'name', label: 'Name', align: 'left' },
    { key: 'entity_type', label: 'Entity Type' },
    { key: 'business_type', label: 'Business Type' },
    { key: 'emirates', label: 'Emirates' },
    { key: 'location', label: 'Location' },
    { key: 'vat_number', label: 'VAT Number' },
    { key: 'ct_number', label: 'CT Number' },
    { key: 'email', label: 'Email' },
    { key: 'password', label: 'Password' },
    { key: 'ct_due_date', label: 'CT Due' },
    { key: 'vat_due_date', label: 'VAT Due' },
    { key: 'trade_licence_expiry', label: 'Licence Expiry' },
    { key: 'emirate', label: 'Emirate ID' },
    { key: 'password_expiry', label: 'Password Expiry' },
    { key: 'contact_number', label: 'Contact' },
    { key: 'address', label: 'Address' },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 4, position: 'relative' }}>
      <Box>
        <Box mt={4} mb={2}>
          <Typography variant="h3" marginBottom="16px" gutterBottom>
            Clients List
          </Typography>
        </Box>

        {clients.length > 0 ? (
          <>
            <Box
              ref={containerRef}
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
              sx={{
                width: '100%',
                maxHeight: '500px',
                overflowX: 'auto',
                overflowY: 'auto',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                marginBottom: '8px',

                scrollbarWidth: 'auto',
                scrollbarColor: '#3e4095 #f0f0f0',

                '&::-webkit-scrollbar': {
                  width: '20px',
                  height: '20px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f0f0f0',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#3e4095',
                  borderRadius: '10px',
                  border: '2px solid transparent',
                  backgroundClip: 'content-box',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: '#555',
                },
              }}
            >
              <TableContainer
                component={Paper}
                sx={{
                  overflowX: 'auto',
                  overflowY: 'auto',
                  minWidth: 1600,
                  width: 'fit-content',
                  backgroundColor: '#fff',
                  borderRadius: '2px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)',

                  '&::-webkit-scrollbar': {
                    width: '20px',
                    height: '20px',
                  },
                  '&::-webkit-scrollbar-track': {
                    backgroundColor: '#eaeaea',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#888',
                    borderRadius: '10px',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#666',
                  },
                }}
              >
                <Table sx={{ minWidth: 1600 }} aria-label="clients table" stickyHeader>
                  <TableHead>
                    <TableRow>
                      {fields.map(({ label, key, align }) => (
                        <TableCell
                          key={key}
                          align={align || 'center'}
                          sx={{
                            fontWeight: 700,
                            color: '#2d2d63',
                            backgroundColor: '#f9faff',
                            fontSize: '14px',
                            padding: '6px 10px',
                            whiteSpace: 'nowrap',
                            minWidth: key === 'upcoming_due' ? 140 : undefined,
                          }}
                        >
                          {label}
                        </TableCell>
                      ))}
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 400,
                          color: '#2d2d63',
                          backgroundColor: '#f9faff',
                          padding: '6px 10px',
                          whiteSpace: 'nowrap',
                          minWidth: 140,
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.map((client) => {
                      const isEditing = editingClientId === client._id;

                      return (
                        <TableRow
                          key={client._id}
                          sx={{
                            '&:hover': {
                              backgroundColor: '#f1f5ff',
                            },
                          }}
                        >
                          {fields.map(({ key, align }) => {
                            if (key === 'password' && !isEditing) {
                              return (
                                <TableCell
                                  key={key}
                                  align={align || 'center'}
                                  sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
                                >
                                  {client[key]}
                                </TableCell>
                              );
                            }

                            return (
                              <TableCell
                                key={key}
                                align={align || 'center'}
                                sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
                              >
                                {isEditing ? (
                                  <input
                                    type={key === 'email' ? 'email' : 'text'}
                                    value={
                                      editedClient[key] !== undefined && editedClient[key] !== null
                                        ? String(editedClient[key])
                                        : ''
                                    }
                                    onChange={(e) =>
                                      setEditedClient((prev) => ({
                                        ...prev,
                                        [key]: e.target.value,
                                      }))
                                    }
                                    style={{
                                      width: '100%',
                                      border: '2px solid #413f91',
                                      padding: '4px 6px',
                                    }}
                                    autoFocus={key === fields[0].key}
                                    title={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                                  />
                                ) : (
                                  client[key]
                                )}
                              </TableCell>
                            );
                          })}
                          <TableCell
                            align="center"
                            sx={{ padding: '6px 10px', whiteSpace: 'nowrap' }}
                          >
                            {isEditing ? (
                              <>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="small"
                                  onClick={handleSaveRow}
                                  sx={{ mr: 1 }}
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="text"
                                  color="secondary"
                                  size="small"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <IconButton
                                  onClick={() => handleEditRow(client)}
                                  aria-label="edit"
                                  size="small"
                                  color="primary"
                                  disabled={editingClientId !== null}
                                >
                                  <EditIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => handleDeleteClient(client._id)}
                                  disabled={editingClientId !== null} // prevent deletion while editing
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </>
        ) : (
          <Typography variant="body1" sx={{ mt: 4 }}>
            No clients found.
          </Typography>
        )}

        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/clients/add-new')}>
            Add Client
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ClientsList;
