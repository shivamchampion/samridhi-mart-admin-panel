// src/components/ChakraModal.jsx
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure
  } from '@chakra-ui/react';
  import { motion } from 'framer-motion';
  
  // Create motion variant of Chakra UI's ModalContent
  const MotionModalContent = motion(ModalContent);
  
  /**
   * Enhanced Chakra UI modal with animations and consistent styling
   */
  const ChakraModal = ({
    isOpen,
    onClose,
    title,
    children,
    primaryActionLabel = 'Save',
    primaryAction,
    secondaryActionLabel = 'Cancel',
    secondaryAction = null,
    size = 'md', // xs, sm, md, lg, xl, full
    isCentered = true,
    showCloseButton = true,
    isLoading = false,
    footerContent = null
  }) => {
    // Animation variants
    const modalVariants = {
      hidden: { opacity: 0, y: 20, scale: 0.95 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          type: 'spring', 
          damping: 25, 
          stiffness: 500 
        }
      },
      exit: { 
        opacity: 0, 
        y: 20, 
        scale: 0.95, 
        transition: { duration: 0.2 } 
      }
    };
  
    // Handle default secondary action
    const handleSecondaryAction = () => {
      if (secondaryAction) {
        secondaryAction();
      } else {
        onClose();
      }
    };
  
    return (
      <Modal 
        isOpen={isOpen} 
        onClose={onClose}
        size={size}
        isCentered={isCentered}
        motionPreset="none" // We'll handle the animations ourselves
      >
        <ModalOverlay 
          bg="blackAlpha.600"
          backdropFilter="blur(2px)"
        />
        <MotionModalContent
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          mx={4} // Add margin to prevent touching the edge on mobile
          my={4}
          borderRadius="xl"
          boxShadow="xl"
        >
          {title && (
            <ModalHeader
              borderBottomWidth="1px"
              py={4}
              px={6}
              bgGradient="linear(to-r, brand.500, brand.600)"
              color="white"
              borderTopRadius="xl"
            >
              {title}
            </ModalHeader>
          )}
          
          {showCloseButton && <ModalCloseButton color={title ? "white" : "gray.500"} />}
          
          <ModalBody py={6} px={6}>
            {children}
          </ModalBody>
  
          {(primaryAction || secondaryAction || footerContent) && (
            <ModalFooter bg="gray.50" borderBottomRadius="xl" py={4} px={6} borderTopWidth="1px">
              {footerContent ? (
                footerContent
              ) : (
                <>
                  <Button 
                    mr={3} 
                    onClick={handleSecondaryAction}
                    variant="outline"
                  >
                    {secondaryActionLabel}
                  </Button>
                  <Button 
                    colorScheme="brand" 
                    onClick={primaryAction}
                    isLoading={isLoading}
                  >
                    {primaryActionLabel}
                  </Button>
                </>
              )}
            </ModalFooter>
          )}
        </MotionModalContent>
      </Modal>
    );
  };
  
  export default ChakraModal;