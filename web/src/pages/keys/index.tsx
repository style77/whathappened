import React, { useState } from "react";
import { HttpError, useTable } from "@refinedev/core";
import { useModalForm } from "@refinedev/react-hook-form";

import { Layout } from "../../components/dashboard/Layout";
import { IKey } from "../../interfaces";
import { MinusCircleIcon, MinusIcon } from "@heroicons/react/24/outline";



export const Keys: React.FC = () => {
    const { tableQueryResult } = useTable<IKey>({})

    const {
        formState: { errors },
        refineCore: { onFinish, formLoading },
        modal: { visible: visibleKeyCreateModal, close: closeKeyCreateModal, show: showKeyCreateModal },
        register: registerKeyCreate,
        handleSubmit: handleKeyCreate,
        saveButtonProps,
    } = useModalForm<IKey, HttpError, IKey>({
        refineCoreProps: { action: "create" },
    });

    const handleKeyCreation = (e: React.FormEvent) => {
        handleKeyCreate(e);
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Keys</h1>
                    <button className="btn btn-primary" onClick={() => showKeyCreateModal()}>
                        Create Key
                    </button>
                </div>

                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Key</th>
                            <th>Created At</th>
                            <th>Allowed Domains</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableQueryResult.data?.data.map((record) => (
                            <tr key={record.key}>
                                <td>{record.key}</td>
                                <td>{record.createdAt.toLocaleString()}</td>
                                <td>{record.allowed_domains.join(", ")}</td>
                                <td>
                                    {/* <button className="btn btn-secondary btn-sm" onClick={() => showEditModal(record.id)}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(record.id)}>
                                        Delete
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal visible={visibleKeyCreateModal} onClose={closeKeyCreateModal} title="Create Key" buttonLabel="Create Key" description="Fill in the form below to create a new key.">
                    <Form onSubmit={handleKeyCreation}>
                        <AllowedDomainsField {...registerKeyCreate("allowed_domains")} />
                        <div className="modal-action">
                            <button className="btn btn-primary" type="submit">
                                Create Key
                            </button>
                        </div>
                    </Form>
                </Modal>
                {/* <Modal {...editModalProps} title="Edit Key">
                    <Form {...editFormProps}>
                        <div className="form-control">
                            <label className="label" htmlFor="key">Key</label>
                            <input id="key" name="key" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="allowed_domains">Allowed Domains</label>
                            <textarea id="allowed_domains" name="allowed_domains" className="textarea textarea-bordered" />
                        </div>
                        <div className="form-control mt-4">
                            <button className="btn btn-primary" type="submit">
                                Submit
                            </button>
                        </div>
                    </Form>
                </Modal> */}
            </div>
        </Layout>
    );
};

const Modal: React.FC<{ visible: boolean, onClose: () => void, title: string, description: string, buttonLabel: string, children: React.ReactNode }> = ({ visible, onClose, title, description, buttonLabel, children }) => {
    if (!visible) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
                <h2 className="font-bold text-lg">{title}</h2>
                {
                    description && (
                        <h3 className="text-sm text-gray-500 mb-4">{description}</h3>
                    )
                }
                {children}
            </div>
        </div>
    );
};

const Form: React.FC<{ onSubmit: (values: any) => void, children: React.ReactNode }> = ({ onSubmit, children }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const values = Object.fromEntries(formData.entries());
        onSubmit(values);
    };

    return (
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    );
};

const AllowedDomainsField: React.FC<{ onChange: (value: any) => void }> = ({ onChange }) => {
    const [domains, setDomains] = useState<string[]>([]);
    const [newDomain, setNewDomain] = useState("");
    const [error, setError] = useState<string | null>(null);

    const isValidUrl = (url: string) => {
        const pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-zA-Z0-9\\-\\.]+)\\.([a-zA-Z]{2,}))|" + // domain
            "localhost|" + // localhost
            "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" + // IPv4
            "\\[([a-fA-F0-9:]+)\\])" + // IPv6
            "(:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$", // port and path
            "i"
        );
        return pattern.test(url);
    };

    const addDomain = () => {
        if (newDomain.trim() === "") {
            setError("Domain cannot be empty");
            return;
        }

        if (!isValidUrl(newDomain)) {
            setError("Invalid URL format");
            return;
        }

        if (domains.includes(newDomain)) {
            setError("Domain already in the list");
            return;
        }

        const updatedDomains = [...domains, newDomain];
        setDomains(updatedDomains);
        onChange(updatedDomains);
        setNewDomain("");
        setError(null);
    };

    const removeDomain = (domainToRemove: string) => {
        const updatedDomains = domains.filter(domain => domain !== domainToRemove);
        setDomains(updatedDomains);
        onChange(updatedDomains);
    };

    return (
        <div className="form-control mb-4">
            <label className="text-sm" htmlFor="allowed_domains">
                Allowed Domains
            </label>
            <span className="text-xs text-gray-500 block mb-2">
                Add domains that are allowed to make requests using this key.
                You don't have to specify the protocol (http/https), unless you want to restrict the key to a specific protocol.
            </span>
            <div className="flex my-2 items-center">
                <input
                    id="new_domain"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="input input-bordered flex-grow"
                    placeholder="Add a domain"
                />
                <button
                    type="button"
                    className="btn btn-secondary ml-2"
                    onClick={addDomain}
                >
                    Add
                </button>
            </div>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <ul className="list-disc">
                {domains.map((domain, index) => (
                    <li key={index} className="flex items-center mb-1 justify-between">
                        <span>{domain}</span>
                        <button
                            type="button"
                            className="btn btn-sm btn-error p-0"
                            onClick={() => removeDomain(domain)}
                        >
                            <MinusIcon className="w-6 h-auto text-white" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};