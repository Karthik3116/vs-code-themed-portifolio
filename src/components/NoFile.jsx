import React from 'react';

const NoFile = () => {
  const commands = [
    { name: 'Show All Commands', keys: ['Ctrl', 'Shift', 'P'] },
    { name: 'Open File', keys: ['Ctrl', 'O'] },
    { name: 'Open Folder', keys: ['Ctrl', 'K', 'Ctrl', 'O'] },
    { name: 'Open Recent', keys: ['Ctrl', 'R'] },
    { name: 'Open Chat', keys: ['Ctrl', 'Alt', 'I'] },
  ];

  return (
    <div className="flex flex-col items-center justify-center  bg-base-100 p-8 select-none text-base-content/70"
          style={{ minHeight: "calc(100vh - 8rem)" }}
    >
      {/* VSCode Logo from public folder */}
      <img
        src="/vscode.svg"
        alt="VSCode Logo"
        className="w-48 h-48 mb-16 opacity-20"
      />

      {/* Command List */}
      <div className="space-y-3 w-full max-w-sm text-center">
        {commands.map((command, index) => (
          <div key={index} className="flex justify-between items-center text-sm text-base-content/80">
            <span>{command.name}</span>
            <div className="flex items-center space-x-1">
              {command.keys.map((key, keyIndex) => (
                <kbd
                  key={keyIndex}
                  className="px-2 py-1 bg-base-200 text-base-content rounded-md text-xs font-mono"
                >
                  {key}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoFile;
